
const commonModels = () => {
  return [
    import('./models/user/user.js'),
    import('./models/goods/goods.js'),
    import('./models/comment/comment.js'),
    import('./models/common/common.js'),
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
    path: '/regist',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/regist/RegistContainer.jsx'),
  },
  {
    path: '/login',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/login/LoginContainer.jsx'),
  },
  {
    path: '/search',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/SearchAndReceiveContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/SearchAndReceiveContainer.jsx'),
  },
  {
    path: '/detail/:id',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/DetailContainer.jsx'),
  },
  {
    path: '/release',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/ReleaseContainer.jsx'),
  },
  {
    path: '/about_us',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/static/StaticContainer.jsx'),
  },
  {
    path: '/help',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/static/StaticContainer.jsx'),
  },
];
