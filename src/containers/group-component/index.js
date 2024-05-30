import { memo } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "../../components/wrapper";
import { Flex } from "antd";


function GroupComponent({group}) {
    const dispatch = useDispatch();

    return(
        <Wrapper>
            <Flex vertical gap='middle'>
                
            </Flex>
        </Wrapper>
    );
}

export default memo(GroupComponent);