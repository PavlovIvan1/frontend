import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { Loading } from '../Loading'
import { Boost } from '../pages/Boost/Boost'
import { Earn } from '../pages/Earn/Earn'
import { EarnCoTaskComplited } from '../pages/EarnCoTasks/EarnCoTaskComplited'
import { EarnVoFin } from '../pages/EarnFineshed/EarnFinished'
import { Frens } from '../pages/Frens/Frens'
import { NotVote } from '../pages/NotVote'
import { CreateSquad } from '../pages/Saquads/CreateSquad'
import { Squads } from '../pages/Saquads/Squads'
import { SquadOpen } from '../pages/SquadOpen/SquadOpen'
import { SquadOpenInSquad } from '../pages/SquadOpen/SquadOpenInSquad'
import { Stats } from '../pages/Stats/Stats'
import { YVote } from '../pages/YVote'
import { PlayOnMobile } from '../PlayOnMobile'

export const Pages = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/frens',
    element: <Frens />,
  },
  {
    path: '/boost',
    element: <Boost />,
  },
  {
    path: '/ecomtasks',
    element: <EarnCoTaskComplited />,
  },
  {
    path: '/earn',
    element: <Earn />,
  },
  {
    path: '/squads',
    element: <Squads />,
  },
  {
    path: '/squadopen',
    element: <SquadOpen />,
  },
  {
    path: '/insquad',
    element: <SquadOpenInSquad />,
  },
  {
    path: '/stats',
    element: <Stats />,
  },
  {
    path: '/earnvofin',
    element: <EarnVoFin />,
  },
  {
    path: '/notvote',
    element: <NotVote />,
  },
  {
    path: '/yvote',
    element: <YVote />,
  },
  {
    path: '/mobapp',
    element: <PlayOnMobile />,
  },
  {
    path: '/createsquad',
    element: <CreateSquad />,
  },
  {
    path: '/loading',
    element: <Loading />,
  },
];

export const router = createBrowserRouter(Pages);
