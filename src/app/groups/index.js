import { memo, useCallback, useMemo, useState } from "react";
import PageLayout from "../../components/page-layout";
import Header from "../../components/header";
import logo from '../../img/logo.png';
import groupsActions from '../../store/groups/actions';
import modalsActions from '../../store/modals/actions';
import lessonPlanActions from '../../store/lesson-plan/actions'
import LessonPlanLayout from "../../components/lesson-plan-layout";
import Wrapper from "../../components/wrapper";
import { useDispatch, useSelector } from "react-redux";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import { Collapse, Button } from "antd";
import InputSearch from "../../components/input-search";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import GroupComponent from "../../containers/group-component";
import subjectsActions from '../../store/subjects/actions'
import teachersActions from '../../store/teachers/actions';

function Groups() {

    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    useInit(() => {
        dispatch(groupsActions.load());
        dispatch(subjectsActions.load());
        dispatch(teachersActions.load())
    })

    const select = useSelector(state => ({
        groups: state.groups.list,
        waiting: state.groups.waiting
    }))

    const callbacks = {
        onDownload: useCallback(props => {
            dispatch(lessonPlanActions.getPDF(props))
        }, [dispatch]),
        onSearch: useCallback(query => {
            dispatch(groupsActions.load(query))
            setQuery(query);
        }),
        newGroup: () => {
            dispatch(modalsActions.open('newGroup'))
        }
    }

    const onDownload = (props) => (
        <DownloadOutlined onClick={() => callbacks.onDownload(props)} />
    )

    const groups = useMemo(() => {
        const groups = [];
        select.groups.forEach(group => {
            groups.push({
                key: group.id,
                label: `${group.groupCode}`,
                children: <GroupComponent group={group} />,
                extra: onDownload({ groupId: group.id, name: `${group.groupCode}` })
            })
        })
        return groups;
    }, [select.groups])


    return (
        <PageLayout>
            <Header logo={logo} selected={'groups'} />
            <LessonPlanLayout>
                <Wrapper>
                    <InputSearch
                        value={query}
                        placeholder='Поиск'
                        prefix={<SearchOutlined />}
                        size='large' onChange={callbacks.onSearch} />
                    <Button type="primary" onClick={ callbacks.newGroup}> Добавить новую группу</Button>
                    <Spinner active={select.waiting}>
                        <Collapse items={groups} />
                    </Spinner>
                </Wrapper>
            </LessonPlanLayout>
        </PageLayout>
    )
}

export default memo(Groups);