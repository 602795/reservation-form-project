import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';
import moment from 'Moment';
import DateRangePicker from '@/components/ReservationForm/DateRangePicker.vue';

describe('DateRangePicker Component Test', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(DateRangePicker, {
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