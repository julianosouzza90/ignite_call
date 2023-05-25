import { Calendar } from '@/src/components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerList,
  TimerPickerHeader,
  TimePickerItem,
} from './styles'

export function CalendarStep() {
  const isDateSelected = true
  return (
    <Container isTimePickerOpen={true}>
      <Calendar />
      {isDateSelected && (
        <TimePicker>
          <TimerPickerHeader>
            Terça feira <span>20 de opps</span>
          </TimerPickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
