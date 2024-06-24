import { Address, Bytes } from "@graphprotocol/graph-ts";

import { BophadesKernel } from "../../generated/Range_v2/BophadesKernel";

const KERNEL_ADDRESS = "0x2286d7f9639e8158FaD1169e76d1FbC38247f54b";

function getKernelAddress(): Address {
  return Address.fromString(KERNEL_ADDRESS);
}

/**
 * Determines the Bophades address for a module.
 *
 * This is done dynamically using the Bophades Kernel contract,
 * as the module can be upgraded and the Kernel is less likely to be.
 *
 * @returns
 */
export function getModuleAddress(keycode: string): Address {
  // Get the kernel
  const kernelAddress = getKernelAddress();
  const kernelContract = BophadesKernel.bind(kernelAddress);

  // Get the module address
  return kernelContract.getModuleForKeycode(Bytes.fromUTF8(keycode));
}
