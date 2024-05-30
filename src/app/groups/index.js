import { memo, useMemo } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import groupsActions from '../../store/groups/actions'
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Wrapper from "../../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";

function Groups() {

    const dispatch = useDispatch();

    useInit(() => {
        dispatch(groupsActions.load());
    })

    const select = useSelector(state => ({
        groups: state.groups.list,
        waiting: state.groups.waiting
    }))

    const groups = useMemo(() => {
        const groups = [];
        select.groups.forEach(group => {
            groups.push({
                key: group.id
            })
        })
    })


    return(
        <PageLayout>
            <Header logo={logo} selected={'groups'}/>
            <LessonPlanLayout>
                <Wrapper>

                </Wrapper>
            </LessonPlanLayout>
        </PageLayout>
    )
}

export default memo(Groups);