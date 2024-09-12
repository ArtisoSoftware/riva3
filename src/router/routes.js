const routes = [
  {
    path: "/",
    component: () => import("pages/Welcome.vue"),
  },
  // VA Page
  {
    path: "/gvcrelationships/:iso?/:year?",
    component: () => import("pages/GVCrelationships.vue"),
  },
  {
    path: "/structureofvalueadded/:exp?/:imp?/:sector?/:year?",
    component: () => import("pages/StructureOfValueAdded.vue"),
  },
  {
    path: "/participationingvcs/:exp?/:imp?/:sector?/:year?",
    component: () => import("pages/ParticipationInGVCs.vue"),
  },
  {
    path: "/backwardlinkages/:exp?/:imp?/:sector?/:year?",
    component: () => import("pages/BackwardLinkages.vue"),
  },
  {
    path: "/backwardlinkagessource/:exp?/:imp?/:source?/:year?",
    component: () => import("pages/BackwardLinkagesSource.vue"),
  },

  {
    path: "/forwardlinkages/:exp?/:sector?/:year?",
    component: () => import("pages/ForwardLinkages.vue"),
  },
  {
    path: "/forwardlinkagesimport/:exp?/:imp?/:year?",
    component: () => import("pages/ForwardLinkagesImport.vue"),
  },
  {
    path: "/countrybrief",
    component: () => import("pages/Countrybrief.vue"),
  },
  {
    path: "/countrydata",
    component: () => import("pages/CountrybriefData.vue"),
  },
  // RI Page
  {
    path: "/rioverview",
    component: () => import("pages/ri_overview.vue"),
  },
  {
    path: "/riintragroup",
    component: () => import("pages/ri_intraGroup.vue"),
    name: "riintragroup",
  },
  {
    path: "/riintragroup_clear",
    component: () => import("pages/ri_intraGroup.vue"),
    name: "riintragroup_clear",
  },
  {
    path: "/riecopartner/:key?",
    component: () => import("pages/ri_ecopartner.vue"),
    name: "rieconomypartner",
  },
  {
    path: "/riecopartner_clear",
    component: () => import("pages/ri_ecopartner.vue"),
    name: "rieconomypartner_clear",
  },
  {
    path: "/ribuildyourown",
    component: () => import("pages/ri_buildYourOwn.vue"),
    name: "ribuildyourown",
  },
  {
    path: "/ribuildyourown_clear",
    component: () => import("pages/ri_buildYourOwn.vue"),
    name: "ribuildyourown_clear",
  },
  {
    path: "/ricountrybrief2/:iso",
    component: () => import("pages/ri_countrybrief2.vue"),
    name: "ricountrybrief2",
  },
  {
    path: "/ricountrybrief",
    component: () => import("pages/ri_countrybrief.vue"),
    name: "ricountrybrief",
  },
  {
    path: "/ridataavail/:key?",
    component: () => import("pages/ri_dataAvail.vue"),
  },
  {
    path: "/ridownload",
    component: () => import("pages/ri_download.vue"),
  },
  {
    path: "/reloadpage/:page",
    component: () => import("pages/ri_reloadpage.vue"),
    name: "reloadpage",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
