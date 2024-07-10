const routes = [
  {
    path: "/",
    component: () => import("pages/Welcome.vue"),
  },
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
    path: "/forwardlinkages",
    component: () => import("pages/ForwardLinkages.vue"),
  },
  {
    path: "/forwardlinkagesimport",
    component: () => import("pages/ForwardLinkagesImport.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
