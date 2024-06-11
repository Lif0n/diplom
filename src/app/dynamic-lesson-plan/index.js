import { memo } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";


function DynamicLessonPlan() {

  return(
    <PageLayout>
      <Header logo={logo} selected='dynamic'/>
    </PageLayout>
  )
}

export default memo(DynamicLessonPlan)