import { memo, useCallback, useMemo } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import groupsActions from '../../store/groups/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Wrapper from "../../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import { Collapse } from "antd";
import { DownloadOutlined } from '@ant-design/icons'
import GroupComponent from "../../containers/group-component";

function Groups() {

    const dispatch = useDispatch();

    useInit(() => {
        dispatch(groupsActions.load());
    })

    const select = useSelector(state => ({
        groups: state.groups.list,
        waiting: state.groups.waiting
    }))

    const callbacks = {
        onDownload: useCallback(groupId => {
            dispatch(lessonPlanActions.getPDF(groupId))
        }, [dispatch])
    }

    const onDownload = (groupId) => (
        <DownloadOutlined onClick={() =>callbacks.onDownload(groupId)} />
    )

    const groups = useMemo(() => {
        const groups = [];
        select.groups.forEach(group => {
            groups.push({
                key: group.id,
                label: `${group.speciality.shortname}-${group.name}`,
                children: <GroupComponent group={group} />,
                extra: onDownload(group.id)
            })
        })
        return groups;
    }, [select.groups])


    return (
        <PageLayout>
            <Header logo={logo} selected={'groups'} />
            <LessonPlanLayout>
                <Wrapper>
                    <Spinner active={select.waiting}>
                        <Collapse items={groups} />
                    </Spinner>
                </Wrapper>
            </LessonPlanLayout>
        </PageLayout>
    )
}

export default memo(Groups);