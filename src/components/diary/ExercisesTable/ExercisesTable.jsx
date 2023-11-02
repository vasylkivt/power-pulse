import { useEffect, useState } from 'react';
import { useDeleteExerciseMutation } from '../../../redux/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TableDiv,
  Table,
  TableMainTitles,
  TableTitleTr,
  TableMainTitle,
  TableBody,
  TableTr,
  TableInfoTd,
  BtnTd,
  DelBtnTable,
  DelIcon,
} from './ExercisesTable.styled';
import PropTypes from 'prop-types';
import sprite from '../../../assets/images/sprite/sprite.svg';

export default function ExercisesTable({ diaryExercises, setDiaryExercises }) {
  const [deleteExercise] = useDeleteExerciseMutation();

  const [isTableDesk, setIsTableDesk] = useState(window.innerWidth >= 768);

  const handleResize = () => {
    setIsTableDesk(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDeleteExercise = async id => {
    try {
      await deleteExercise(id);

      const filteredDiaryExercises = diaryExercises.filter(
        exercise => exercise._id !== id,
      );

      setDiaryExercises(filteredDiaryExercises);
    } catch (error) {
      console.log(error);
    }
  };

  const convertInMin = sec => {
    return `${Math.floor(sec / 60)} min ${
      sec % 60 === 0 ? '' : (sec % 60) + 'sec'
    }`;
  };

  return (
    <>
      <TableDiv>
        {isTableDesk ? (
          <Table>
            <TableMainTitles>
              <TableTitleTr>
                <TableMainTitle>Body Part</TableMainTitle>
                <TableMainTitle>Equipment</TableMainTitle>
                <TableMainTitle>Name</TableMainTitle>
                <TableMainTitle>Target</TableMainTitle>
                <TableMainTitle>Burned Calories</TableMainTitle>
                <TableMainTitle>Time</TableMainTitle>
              </TableTitleTr>
            </TableMainTitles>
            <AnimatePresence>
              {diaryExercises.map(exercise => {
                return (
                  <TableBody
                    as={motion.tbody}
                    initial={{ x: 900 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ x: -900 }}
                    key={exercise._id}
                  >
                    <TableTr>
                      <TableInfoTd>{exercise.bodyPart}</TableInfoTd>
                      <TableInfoTd>{exercise.equipment}</TableInfoTd>
                      <TableInfoTd>{exercise.name}</TableInfoTd>
                      <TableInfoTd>{exercise.target}</TableInfoTd>
                      <TableInfoTd>{exercise.calories}</TableInfoTd>
                      <TableInfoTd>{convertInMin(exercise.time)}</TableInfoTd>
                      <BtnTd>
                        <DelBtnTable
                          onClick={() => {
                            handleDeleteExercise(exercise._id);
                          }}
                        >
                          <DelIcon>
                            <use href={`${sprite}#delete`}></use>
                          </DelIcon>
                        </DelBtnTable>
                      </BtnTd>
                    </TableTr>
                  </TableBody>
                );
              })}
            </AnimatePresence>
          </Table>
        ) : (
          <>
            <AnimatePresence>
              {diaryExercises.map(exercise => {
                return (
                  <Table
                    initial={{ x: 1300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ x: -1700 }}
                    as={motion.table}
                    key={exercise._id}
                  >
                    <TableMainTitles>
                      <TableTitleTr>
                        <TableMainTitle>Body Part</TableMainTitle>
                        <TableMainTitle>Equipment</TableMainTitle>
                        <TableMainTitle>Name</TableMainTitle>
                        <TableMainTitle>Target</TableMainTitle>
                        <TableMainTitle>Burned Calories</TableMainTitle>
                        <TableMainTitle>Time</TableMainTitle>
                      </TableTitleTr>
                    </TableMainTitles>
                    <TableBody>
                      <TableTr>
                        <TableInfoTd>{exercise.bodyPart}</TableInfoTd>
                        <TableInfoTd>{exercise.equipment}</TableInfoTd>
                        <TableInfoTd>{exercise.name}</TableInfoTd>
                        <TableInfoTd>{exercise.target}</TableInfoTd>
                        <TableInfoTd>{exercise.calories}</TableInfoTd>
                        <TableInfoTd>{convertInMin(exercise.time)}</TableInfoTd>
                        <BtnTd>
                          <DelBtnTable
                            onClick={() => {
                              handleDeleteExercise(exercise._id);
                            }}
                          >
                            <DelIcon>
                              <use href={`${sprite}#delete`}></use>
                            </DelIcon>
                          </DelBtnTable>
                        </BtnTd>
                      </TableTr>
                    </TableBody>
                  </Table>
                );
              })}
            </AnimatePresence>
          </>
        )}
      </TableDiv>
    </>
  );
}

ExercisesTable.propTypes = {
  setDiaryExercises: PropTypes.func.isRequired,

  diaryExercises: PropTypes.arrayOf(
    PropTypes.shape({
      bodyPart: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      equipment: PropTypes.string.isRequired,
      exercise_ID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
};
