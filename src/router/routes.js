const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },

  {
    path: "/",
    component: () => import("pages/Welcome.vue"),
  },
  {
    path: "/gvcrelationships",
    component: () => import("pages/GVCrelationships.vue"),
  },
  {
    path: "/structureofvalueadded",
    component: () => import("pages/StructureOfValueAdded.vue"),
  },
  {
    path: "/participationingvcs",
    component: () => import("pages/ParticipationInGVCs.vue"),
  },
  {
    path: "/backwardlinkages",
    component: () => import("pages/BackwardLinkages.vue"),
  },
  {
    path: "/forwardlinkages",
    component: () => import("pages/ForwardLinkages.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
