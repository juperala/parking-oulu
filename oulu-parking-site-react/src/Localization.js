import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  fi: {
    appTitle: "Oulun Parkit",
    appFooter:
      "Oulun Parkit - Oulun pysäköintitalojen tilatiedot netissä. © 2018 Juho Perälä.",
    mapView: "Karttanäkymä",
    listView: "Listanäkymä",
    address: "Osoite:",
    freespace: "Vapaat parkkipaikat:",
    notAvailable: "Ei tilatietoja.",
    xDay: "{0} VRK",
    xDays: "{0} VRK",
    tableFree: "Paikkoja vapaana",
    tableTotal: "Paikkoja yhteensä",
    back: "← Takaisin",
    timestamp: "Aikaleima : "    
  },
  en: {
    appTitle: "Oulu Parking",
    appFooter:
      "Oulu Parking - Utilization and statistics of Oulu parking stations online. © 2018 Juho Perälä.",
    mapView: "Map view",
    listView: "List view",
    address: "Address:",
    freespace: "Available space:",
    notAvailable: "Information not available.",
    xDay: "{0} DAY",
    xDays: "{0} DAYS",
    tableFree: "Space free",
    tableTotal: "Space total",
    back: "← Back",
    timestamp: "Timestamp : "
  }
});

export default strings;
