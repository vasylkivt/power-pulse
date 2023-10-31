import { useFormik, useFormikContext } from 'formik';
import { userFormSchema } from './YupValidationForm';
import BirthdayInput from '../BirthdayInput/BirthdayInput';
import {
  useLazyRefreshQuery,
  useUpdateUserParamsMutation,
  useUpdateUserNameMutation,
  useFetchUserParamsQuery,
} from 'src/redux/api';
import { useEffect, useState } from 'react';
import {
  Forms,
  FirstInfo,
  AddInfo,
  Data,
  Height,
  CurWeight,
  CalendarI,
  DesWeight,
  Birthday,
  SecondInfo,
  Blood,
  Gender,
  RadioBox,
  Text,
  HealthInfo,
  Lifestyle,
} from './UserForm.styled';

export default function UserForm() {
  const [selectedDate, setSelectedDate] = useState(new Date('2000 10 12'));
  const [refresh, { data, isError }] = useLazyRefreshQuery();
  const [updateUserParams] = useUpdateUserParamsMutation();
  // console.log(data);
  const val = useFormikContext;

  useEffect(() => {
    const fetch = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetch();
  }, [refresh]);

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        height: '',
        currentWeight: '',
        desiredWeight: '',
        birthday: selectedDate,
        blood: '',
        sex: '',
        levelActivity: '',
      },
      validationSchema: userFormSchema,
      onSubmit: async (values, actions) => {
        console.log(values, actions);
        try {
          const data = await updateUserParams(values).unwrap();

          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    });

  // console.log(values);

  return (
    <>
      {data && (
        <Forms autoComplete="off" onSubmit={handleSubmit}>
          <FirstInfo>
            <label htmlFor="name">
              Basic info
              <input
                id="name"
                type="text"
                name="name"
                placeholder="name"
                value={data.user.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && <p>{errors.name}</p>}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="email"
              value={data.user.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
          </FirstInfo>
          <AddInfo>
            <Data>
              <Height htmlFor="height">
                Height
                <input
                  id="heght"
                  type="number"
                  name="height"
                  placeholder="0"
                  min="150"
                  max="230"
                  value={values.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.height && touched.height && <p>{errors.height}</p>}
              </Height>
              <CurWeight htmlFor="currentWeight">
                Current Weight
                <input
                  id="currentWeight"
                  type="number"
                  name="currentWeight"
                  placeholder="0"
                  min="35"
                  value={values.currentWeight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.currentWeight && touched.currentWeight && (
                  <p>{errors.currentWeight}</p>
                )}
              </CurWeight>
            </Data>
            <CalendarI>
              <DesWeight htmlFor="desiredWeight">
                Desired Weight
                <input
                  id="desiredWeight"
                  type="number"
                  name="desiredWeight"
                  placeholder="0"
                  min="35"
                  value={values.desiredWeight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.desiredWeight && touched.desiredWeight && (
                  <p>{errors.desiredWeight}</p>
                )}
              </DesWeight>

              <Birthday>
                <BirthdayInput
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  // value={format(selectedDate, 'yyyy-MM-dd')}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </Birthday>
              {errors.birthday && touched.birthday && <p>{errors.birthday}</p>}
            </CalendarI>
          </AddInfo>
          <SecondInfo>
            <Text> Blood </Text>
            <HealthInfo>
              <Blood>
                <RadioBox
                  type="radio"
                  name="blood"
                  id="one"
                  value="1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.blood === '1'}
                />
                <label htmlFor="one">1</label>
                {errors.blood && touched.blood && <p>{errors.blood}</p>}

                <RadioBox
                  type="radio"
                  name="blood"
                  id="two"
                  value="2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.blood === '2'}
                />
                <label htmlFor="two">2</label>

                <RadioBox
                  type="radio"
                  name="blood"
                  id="three"
                  value="3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.blood === '3'}
                />
                <label htmlFor="three">3</label>

                <RadioBox
                  type="radio"
                  name="blood"
                  id="four"
                  value="4"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.blood === '4'}
                />
                <label htmlFor="four">4</label>
              </Blood>
              <Gender>
                <label>
                  <RadioBox
                    type="radio"
                    name="sex"
                    id="male"
                    value="male"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.sex === 'male'}
                  />
                  Male
                </label>

                <label>
                  <RadioBox
                    type="radio"
                    name="sex"
                    id="female"
                    value="female"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.sex === 'female'}
                  />
                  Female
                </label>
                {errors.sex && touched.sex && <p>{errors.sex}</p>}
              </Gender>
            </HealthInfo>
            <Lifestyle>
              <label>
                <div>
                  <RadioBox
                    type="radio"
                    name="levelActivity"
                    id="1"
                    value={1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.levelActivity === '1'}
                  />
                </div>
                Sedentary lifestyle (little or no physical activity)
              </label>
              <label>
                <div>
                  <RadioBox
                    type="radio"
                    name="levelActivity"
                    id="2"
                    value="2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.levelActivity === '2'}
                  />
                </div>
                Light activity (light exercises/sports 1-3 days per week)
              </label>
              <label>
                <div>
                  <RadioBox
                    type="radio"
                    name="levelActivity"
                    id="3"
                    value="3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.levelActivity === '3'}
                  />
                </div>
                Moderately active (moderate exercises/sports 3-5 days per week)
              </label>
              <label>
                <div>
                  <RadioBox
                    type="radio"
                    name="levelActivity"
                    id="4"
                    value="4"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.levelActivity === '4'}
                  />
                </div>
                Very active (intense exercises/sports 6-7 days per week)
              </label>
              <label>
                <div>
                  <RadioBox
                    type="radio"
                    name="levelActivity"
                    id="5"
                    value="5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.levelActivity === '5'}
                  />
                </div>
                Extremely active (very strenuous exercises/sports and physical
                work)
              </label>
            </Lifestyle>
            {errors.levelActivity && touched.levelActivity && (
              <p>{errors.levelActivity}</p>
            )}
          </SecondInfo>
          <button type="submit">Save</button>
        </Forms>
      )}
    </>
  );
}
