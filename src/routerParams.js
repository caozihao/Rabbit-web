
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
  // {
  //   path: '/products',
  //   models: () => [
  //     ...commonModels(),
  //   ],
  //   page: () => import('./routes/Products.jsx'),
  // },
];
