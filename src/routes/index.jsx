import { lazy } from "react";

const SignIn = lazy(() => import("pages/auth/signIn"))
const Home = lazy(() => import("pages/home"));
const Users = lazy(() => import("pages/users"))
const WorkType = lazy(() => import('pages/ish turi'))
const Bulim = lazy(() => import("pages/bulim"))
const OneBulim = lazy(() => import("pages/bulim/bulim"))
const Xodimlar = lazy(() => import("pages/xodimlar"))
const Xodim = lazy(() => import("pages/xodimlar/xodim"))
const Mahsulotlar = lazy(() => import("pages/mahsulotlar"))
const NuqsonliMahsulotlar = lazy(() => import("pages/nuqsonli mahsulorlar"))
const Xatolar = lazy(() => import("pages/xatolar"))
const Profile = lazy(() => import("pages/profile"))

const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  }
];

const pages = {
  // Diretor
  // Director

  // ADMIN
  Direktor: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/ish_turi",
      element: <WorkType />,
    },
    {
      path: "/bulim",
      element: <Bulim />,
    },
    {
      path: "/bulim/:id",
      element: <OneBulim />,
    },
    {
      path: "/xodimlar",
      element: <Xodimlar />,
    },
    {
      path: "/xodimlar/:id",
      element: <Xodim />,
    },
    {
      path: "/mahsulotlar",
      element: <Mahsulotlar />,
    },
    {
      path: "/xatolar",
      element: <Xatolar />,
    },
    {
      path: "/xisobotlar",
      element: <NuqsonliMahsulotlar />,
    },
    {
      path: "/profile",
      element: <Profile />,
    }
  ],

  //  ASSIST
  Admin: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],

  Tekshiruvchi: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],

  Bulim: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ],
}

export { authRoutes, pages };