import { Suspense } from 'react';
import { Outlet, useResolvedPath } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import Header from 'components/main/Header/Header';
import StatisticsInfo from 'components/main/StatisticsInfo/StatisticsInfo';
import { Container } from './Main.styled';

import { ROUTER } from 'src/utils/constants';

export default function Main() {
  const { pathname } = useResolvedPath();
  const page = pathname.split('/')[1];
  const showStatisticInfo =
    page === '' ||
    page === ROUTER.SIGN_UP ||
    page === ROUTER.SIGN_IN ||
    page === ROUTER.DATA.split('/')[0];

  return (
    <>
      <Header />

      <main>
        <Container showStatisticInfo={showStatisticInfo}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>

          {showStatisticInfo && (
            <StatisticsInfo pathname={pathname} page={page} />
          )}
        </Container>
      </main>
    </>
  );
}
