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
      await deleteExercise('id');

      const filteredDiaryExercises = diaryExercises.filter(
        exercise => exercise._id !== id,
      );

      setDiaryExercises(filteredDiaryExercises);
    } catch (error) {
      console.log(error);
    }
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
                      <TableInfoTd>{exercise.time}</TableInfoTd>
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
                        <TableInfoTd>{exercise.time}</TableInfoTd>
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
