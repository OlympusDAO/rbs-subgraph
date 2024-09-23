// From IAppraiser.Metric
const METRIC_MAP = new Map<number, string>();
METRIC_MAP.set(0, "backing");
METRIC_MAP.set(1, "liquid backing");
METRIC_MAP.set(2, "liquid backing per backed ohm");
METRIC_MAP.set(3, "market value");
METRIC_MAP.set(4, "market cap");
METRIC_MAP.set(5, "premium");

export function getMetricName(metric: i32): string {
  if (!METRIC_MAP.has(metric)) {
    throw new Error("Unknown metric: " + metric.toString());
  }

  return METRIC_MAP.get(metric);
}
