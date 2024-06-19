import { memo, useState } from "react";
import { useDispatch } from 'react-redux';
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import lessonPlanActions from '../../store/lesson-plan/actions';
import useInit from "../../hooks/use-init";
import logo from '../../img/logo.png';
import teachersActions from '../../store/teachers/actions'
import audiencesActions from '../../store/audiences/actions'
import schedulesActions from '../../store/schedule/actions'
import groupsActions from '../../store/groups/actions'
import LessonPlanFilters from "../../containers/lesson-plan-filters";
import LessonPlanTable from "../../containers/lesson-plan-table";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
const { Sider } = Layout;

function LessonPlan() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  useInit(() => {
    dispatch(lessonPlanActions.load());
    dispatch(teachersActions.load());
    dispatch(groupsActions.load());
    dispatch(audiencesActions.load());
    dispatch(schedulesActions.load())
  })

  return (
    <PageLayout>
      <Header logo={logo} selected='' />
      <LessonPlanFilters/>
      <LessonPlanTable/>
    </PageLayout>
  )
}

export default memo(LessonPlan);