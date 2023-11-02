import { useState, useEffect } from 'react';
import {
  BlockItem,
  BlockList,
  Container,
  ExclamationIcon,
  Icon,
  IconWrapper,
  Text,
  TextWrapper,
  Title,
  TitleWrapper,
  Value,
} from './DayDashboard.styled';
import sprite from 'src/assets/images/sprite/sprite.svg';
import PropTypes from 'prop-types';

export default function DayDashboard({
  bmrData,
  diaryProducts,
  diaryExercises,
}) {
  const [AllDayCalories, setAllDayCalories] = useState(null);
  const [AllDayExerCalories, setAllDayExerCalories] = useState(null);
  const [AllMinuts, setAllMinuts] = useState(null);

  useEffect(() => {
    if (diaryProducts.length === 0) {
      setAllDayCalories(null);
      return;
    }
    const CalOneProd = diaryProducts.map(product => product.calories);
    const AllCal = CalOneProd.reduce((total, amount) => total + amount);
    setAllDayCalories(AllCal);
  }, [diaryProducts]);

  useEffect(() => {
    if (diaryExercises.length === 0) {
      setAllDayExerCalories(null);
      return;
    }
    const CalOneExer = diaryExercises.map(exercise => exercise.calories);
    const AllExerCal = CalOneExer.reduce((total, amount) => total + amount);
    setAllDayExerCalories(AllExerCal);
  }, [diaryExercises]);

  useEffect(() => {
    if (diaryExercises.length === 0) {
      setAllMinuts(null);
      return;
    }
    const SecOneExer = diaryExercises.map(exercise => exercise.time);
    const AllSec = SecOneExer.reduce((total, amount) => total + amount);
    const AllInMinuts = Math.trunc(AllSec / 60);
    setAllMinuts(AllInMinuts);
  }, [diaryExercises]);

  return (
    <Container>
      <BlockList>
        <BlockItem highlighted={true}>
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#food`}></use>
            </Icon>

            <Title highlighted={true}>Daily calory intake</Title>
          </TitleWrapper>

          <Value>{bmrData || 2200}</Value>
        </BlockItem>

        <BlockItem highlighted={true}>
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#dumbbell`}></use>
            </Icon>

            <Title highlighted={true}>Daily norm of sports</Title>
          </TitleWrapper>

          <Value>110 min</Value>
        </BlockItem>

        <BlockItem>
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#apple`}></use>
            </Icon>

            <Title>Calories consumed</Title>
          </TitleWrapper>

          <Value>{AllDayCalories !== null ? AllDayCalories : 0}</Value>
        </BlockItem>

        <BlockItem>
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#fire`}></use>
            </Icon>

            <Title>Calories burned</Title>
          </TitleWrapper>

          <Value>{AllDayExerCalories !== null ? AllDayExerCalories : 0}</Value>
        </BlockItem>

        <BlockItem
          caloriesOverConsumed={bmrData - AllDayCalories >= 0 ? false : true}
        >
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#bubble`}></use>
            </Icon>

            <Title>The rest of the calories</Title>
          </TitleWrapper>

          <Value>{bmrData ? bmrData - AllDayCalories : 2200}</Value>
        </BlockItem>

        <BlockItem caloriesOverBurned={110 - AllMinuts < 0 ? true : false}>
          <TitleWrapper>
            <Icon>
              <use href={`${sprite}#running`}></use>
            </Icon>

            <Title>The rest of sports</Title>
          </TitleWrapper>

          <Value>{110 - AllMinuts} min</Value>
        </BlockItem>
      </BlockList>

      <TextWrapper>
        <IconWrapper>
          <ExclamationIcon>
            <use href={`${sprite}#exclamation-mark`}></use>
          </ExclamationIcon>
        </IconWrapper>

        <Text>
          Record all your meals in a calorie diary every day. This will help me
          be aware of my nutrition and make me responsible for my choices.
        </Text>
      </TextWrapper>
    </Container>
  );
}

DayDashboard.propTypes = {
  bmrData: PropTypes.number,

  diaryProducts: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      groupBloodNotAllowed: PropTypes.shape({
        1: PropTypes.bool.isRequired,
        2: PropTypes.bool.isRequired,
        3: PropTypes.bool.isRequired,
        4: PropTypes.bool.isRequired,
      }),
      product_ID: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
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
