import { mount, Wrapper } from '@vue/test-utils';
import { Vue } from 'vue/types/vue';
import moment from 'Moment';
import DateRangePicker from '@/components/ReservationForm/DateRangePicker.vue';

describe('DateRange Picker Component Test', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(DateRangePicker, {
      propsData: {
        type: '',
        dateRange: {
          start: '',
          end: '',
        },
        showCalendar: false,
      },
      mocks: {
        $moment: moment,
      }
    });
  });

  test('Po kliknięciu w labelkę daty początku otworzy kalendarz i zmieni typ na start',  () => {
    const startLabel = wrapper.findAll('.label').at(0);
    startLabel.trigger('click');

    expect(wrapper.emitted('update:show-calendar')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.[0][0]).toBe('start');
  });

  test('Po kliknięciu w labelkę daty końca otworzy kalendarz i zmieni typ na start',  () => {
    const endLabel = wrapper.findAll('.label').at(1);
    endLabel.trigger('click');

    expect(wrapper.emitted('update:show-calendar')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.[0][0]).toBe('end');
  });

  test('Gdy kalendarz jest otwarty, zmiana typu nie powoduje zamknięcia kalendarza',  () => {
    const startLabel = wrapper.findAll('.label').at(0);
    startLabel.trigger('click');

    expect(wrapper.emitted('update:show-calendar')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.length).toBe(1);
    expect(wrapper.emitted('update:type')?.[0][0]).toBe('start');

    // TODO: change setTimeout on Vue nextTick
    setTimeout(() => {
      const endLabel = wrapper.findAll('.label').at(1);
      endLabel.trigger('click');

      expect(wrapper.emitted('update:show-calendar')?.length).toBe(1);
      expect(wrapper.emitted('update:type')?.length).toBe(1);
      expect(wrapper.emitted('update:type')?.[0][0]).toBe('end');
    }, 300);
  });

  test('Pasuje do snapchota', async() => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});