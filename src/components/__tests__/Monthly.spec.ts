import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';
import MonthlyCalendar from '@/components/ReservationForm/Calendar/MonthlyCalendar.vue';
import { extendMoment } from 'moment-range';
import Moment from 'moment';

const moment = extendMoment(Moment as any);

describe('Monthly Calendar Component Test', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(MonthlyCalendar, {
      propsData: {
        type: 'start',
        dateRange: {
          start: '',
          end: '',
        },
        start: moment().clone(),
      },
      mocks: {
        $moment: moment,
      }
    });
  });

  test('Emituje event po kliknięciu w dzień',  () => {
    const today = wrapper.find('.today');
    today.trigger('click');

    expect(wrapper.emitted('date-range-change')?.length).toBe(1);
  });
});