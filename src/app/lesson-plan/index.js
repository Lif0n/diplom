import { memo } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";

function LessonPlan() {

  return(
    <PageLayout>
      <Header/>
    </PageLayout>
  )
}

export default memo(LessonPlan);