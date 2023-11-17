import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { Operator } from "../../generated/PriceV1/Operator";
import { OPERATOR_CONTRACT_V1, OPERATOR_CONTRACT_V1_1, OPERATOR_CONTRACT_V1_3, OPERATOR_CONTRACT_V1_4 } from "../constants";
import { OperatorVersion } from "../../generated/schema";

const OPERATOR_VERSIONS: Map<BigDecimal, string> = new Map<BigDecimal, string>();
OPERATOR_VERSIONS.set(BigDecimal.fromString("1.0"), OPERATOR_CONTRACT_V1);
OPERATOR_VERSIONS.set(BigDecimal.fromString("1.1"), OPERATOR_CONTRACT_V1_1);
OPERATOR_VERSIONS.set(BigDecimal.fromString("1.3"), OPERATOR_CONTRACT_V1_3);
OPERATOR_VERSIONS.set(BigDecimal.fromString("1.4"), OPERATOR_CONTRACT_V1_4);

function getOperatorRecord(): OperatorVersion | null {
  return OperatorVersion.load("Operator");
}

function setOperatorVersion(version: BigDecimal): void {
  const operatorRecord = getOperatorRecord();
  if (operatorRecord) {
    operatorRecord.version = version;
    operatorRecord.save();
    log.info("Updated OperatorVersion record with new version: {}", [version.toString()]);
  } else {
    const operatorRecord = new OperatorVersion("Operator");
    operatorRecord.version = version;
    operatorRecord.save();
    log.info("Created OperatorVersion record with new version: {}", [version.toString()]);
  }
}

/**
 * Returns the currently-active Operator policy contract.
 * 
 * This uses hard-coded addresses and starting blocks, as there is no
 * function for determining the current Operator contract address.
 * 
 * @param block 
 * @returns 
 */
export function getOperatorContract(): Operator {
  // Get the latest version that has been recorded
  const operatorRecord = getOperatorRecord();
  const latestRecordedVersion: BigDecimal | null = operatorRecord !== null ? operatorRecord.version : null;
  let latestVersion: BigDecimal | null = latestRecordedVersion;

  // Iterate over the versions map to find the latest version
  const keys = OPERATOR_VERSIONS.keys();
  for (let i = 0; i < keys.length; i++) {
    const currentVersion: BigDecimal = keys[i];
    // Only proceed if the latestVersion is superceded
    if (latestVersion === null || latestVersion.lt(currentVersion)) {
      // Check if the currentVersion is active
      const operatorContract: Operator = Operator.bind(Address.fromString(OPERATOR_VERSIONS.get(currentVersion)));

      const activeResult = operatorContract.try_active();
      if (!activeResult.reverted && activeResult.value == true) {
        log.info("Found newer active Operator version: {}", [currentVersion.toString()]);
        latestVersion = currentVersion;
      }
      else {
        log.info("Operator version {} is inactive", [currentVersion.toString()]);
      }
    }
  }

  if (latestVersion === null) {
    throw new Error("Unable to determine latest Operator version");
  }

  const operatorAddress = OPERATOR_VERSIONS.get(latestVersion);
  if (operatorAddress === null) {
    throw new Error("Unable to determine latest Operator version");
  }

  // If the latest version has changed, save it
  if (latestRecordedVersion === null || latestRecordedVersion.gt(latestVersion)) {
    setOperatorVersion(latestVersion);
  }

  return Operator.bind(Address.fromString(operatorAddress));
}
