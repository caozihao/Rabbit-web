
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
    page: () => import('./routes/goods/FindContainer.jsx'),
  },
];
