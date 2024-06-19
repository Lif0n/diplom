import React, { memo, useCallback, useState, useEffect, useMemo } from "react";
import ModalLayout from "../../components/modal-layout";
import { Button, Flex, Input, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/wrapper";
import LessonSelect from "../../components/lesson-select";
import { ToastContainer, toast } from "react-toastify";
import parserActions from "../../store/parser/actions";
import generatorActions from "../../store/generator/action";
import Spinner from "../../components/spinner";
import StyledDropzone from "../../components/dropzone";
import modalsActions from "../../store/modals/actions";

function ScheduleModal() {
  const dispatch = useDispatch();

  const [year, setYear] = useState("");
  const [population, setPopulation] = useState("");
  const [generations, setGenerations] = useState("");
  const [department, setDepartment] = useState(null);
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("");
  const [activeTab, setActiveTab] = useState("1"); // Инициализация активной вкладки

  const select = useSelector((state) => ({
    parserWaiting: state.parser.waiting,
    parser: state.parser.result,
  }));

  const callbacks = {
    onTabChange: useCallback((key) => {
      setActiveTab(key);
    }, []),
  
    closeModal: useCallback(() => {
      dispatch(modalsActions.close("schedule"));
    }, [dispatch]),

    addSchedule: useCallback(() => {
      // Логика валидации
      if (!/^\d+$/.test(year) || parseInt(year, 10) < 1000 || parseInt(year, 10) > new Date().getFullYear() + 3 || year.trim().length === 0) {
        toast.error("Введен неверный год");
        return;
      }
      if (!/^\d+$/.test(semester) || parseInt(semester, 10) > 2 || parseInt(semester, 10) < 0 || semester.trim().length === 0) {
        toast.error("Введен неверный семестр");
        return;
      }
      if (department === null) {
        toast.error("Не выбрано отделение");
        return;
      }
      if (file === null) {
        toast.error("Не выбран файл расписания");
        return;
      }

      dispatch(parserActions.load(file, year, semester, department));
      toast.info("Начался парсинг расписания");
    }, [dispatch, year, semester, department, file]),

    genSchedule: useCallback(() => {
      dispatch(generatorActions.load(year, semester, population, generations));
      toast.info("Началась генерация расписания");
    }, [dispatch, year, semester, population, generations]),
  };

  useEffect(() => {
    if (select.parserWaiting) {
      toast.info("Идет парсинг расписания");
    } else if (select.parser === false) {
      toast.error("Произошла ошибка при парсинге расписания");
    } else if (select.parser === true) {
      toast.success("Парсинг прошел успешно");
    }
  }, [select.parserWaiting, select.parser]);

  const tabContents = useMemo(() => ({
    "1": () => (
      <>
        <h3>
          Экспорт расписания из файла
        </h3>
        <Input
          value={year}
          size="large"
          placeholder="Учебный год"
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          value={semester}
          size="large"
          placeholder="Семестр"
          onChange={(e) => setSemester(e.target.value)}
        />
        <LessonSelect
          placeholder="Отделение"
          value={department}
          selectOptions={[
            { value: 1, label: "Первое" },
            { value: 2, label: "Второе" },
          ]}
          onChange={(value) => setDepartment(value)}
        />
        <StyledDropzone setFile={setFile} />
        <Button onClick={callbacks.addSchedule}>Загрузить расписание</Button>
      </>
    ),
    "2": () => (
      <>
        <h3>
          Генерация расписания
        </h3>
        <Input
          value={year}
          size="large"
          placeholder="Учебный год"
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          value={semester}
          size="large"
          placeholder="Семестр"
          onChange={(e) => setSemester(e.target.value)}
        />
        <Input
          value={population}
          size="large"
          placeholder="Популяция"
          onChange={(e) => setPopulation(e.target.value)}
        />
        <Input
          value={generations}
          size="large"
          placeholder="Поколения"
          onChange={(e) => setGenerations(e.target.value)}
        />
        <Button onClick={callbacks.genSchedule}>Начать генерацию</Button>
      </>
    ),
  }), [year, semester, department, file, population, generations, callbacks.addSchedule]);

  const tabs = [
    { key: "1", label: "Экспорт" },
    { key: "2", label: "Генерация" },
  ];

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Spinner active={select.parserWaiting}>
        <ModalLayout
          labelClose="X"
          title=""
          onClose={callbacks.closeModal}
        >
          <Wrapper>
            <Flex vertical gap="large" style={{ margin: "15px 0px" }}>
              <Tabs
                items={tabs}
                activeKey={activeTab}
                onChange={callbacks.onTabChange}
              />
              <Flex vertical gap="middle">
                {tabContents[activeTab] && tabContents[activeTab]()}
              </Flex>
            </Flex>
          </Wrapper>
        </ModalLayout>
      </Spinner>
    </>
  );
}

export default memo(ScheduleModal);