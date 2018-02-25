
const commonModels = () => {
  return [
  ];
};

export default [
  {
    path: '/',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/main/MainContainer.jsx'),
  },
  {
    path: '/find',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/find/MainContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/receive/MainContainer.jsx'),
  },
];
