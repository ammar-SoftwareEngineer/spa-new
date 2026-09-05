/**
 * Maps American AFC product line keys to catalog categories
 * (same grouping style as american-afc.com product cards).
 */
export type AfcCategory = {
  tagKey: string;
  categoryKey: string;
};

export function getAfcCategory(titleKey: string): AfcCategory {
  const key = titleKey.toLowerCase();

  if (
    key.includes("hydrant") &&
    !key.includes("connection") &&
    !key.includes("header")
  ) {
    return { tagKey: "afcCatHydrantsTag", categoryKey: "afcCatHydrants" };
  }

  if (
    key.includes("hose") &&
    !key.includes("valve") &&
    !key.includes("angle_hose")
  ) {
    return { tagKey: "afcCatHosesTag", categoryKey: "afcCatHoses" };
  }

  if (
    key.includes("extinguisher") ||
    key.includes("halotron") ||
    key.includes("carbon_dioxide") ||
    key.includes("dry_chemical") ||
    key.includes("wet_chemical") ||
    key.includes("water_and_water") ||
    key.includes("wheeled")
  ) {
    return { tagKey: "afcCatExtinguishersTag", categoryKey: "afcCatExtinguishers" };
  }

  if (
    key.includes("afc_227") ||
    key.includes("afc-227") ||
    key.includes("afc_p227") ||
    key.includes("afc_5112") ||
    key.includes("kitchen_fire") ||
    key.includes("suppression")
  ) {
    return { tagKey: "afcCatSuppressionTag", categoryKey: "afcCatSuppression" };
  }

  if (key.includes("flow_switch") || key.includes("electrical")) {
    return { tagKey: "afcCatElectricalTag", categoryKey: "afcCatElectrical" };
  }

  if (
    key.includes("connection") ||
    key.includes("test_header") ||
    key.includes("fdc")
  ) {
    return { tagKey: "afcCatFdcTag", categoryKey: "afcCatFdc" };
  }

  return { tagKey: "afcCatValvesTag", categoryKey: "afcCatValves" };
}
