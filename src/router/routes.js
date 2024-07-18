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
  // RI Page
  {
    path: "/rioverview",
    component: () => import("pages/ri_overview.vue"),
  },
  {
    path: "/riintragroup",
    component: () => import("pages/ri_intraGroup.vue"),
  },
  {
    path: "/riecopartner",
    component: () => import("pages/ri_ecopartner.vue"),
  },
  {
    path: "/ribuildyourown",
    component: () => import("pages/ri_buildYourOwn.vue"),
  },
  {
    path: "/ricountrybrief",
    component: () => import("pages/ri_countrybrief.vue"),
  },
  {
    path: "/ridataavail/:id?",
    component: () => import("pages/ri_dataAvail.vue"),
  },
  {
    path: "/ridownload",
    component: () => import("pages/ri_download.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
