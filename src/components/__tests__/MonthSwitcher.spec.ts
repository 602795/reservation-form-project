import { mount, Wrapper } from '@vue/test-utils';
import MonthSwitcher from '@/components/ReservationForm/Calendar/MonthSwitcher.vue';
import { Vue } from 'vue/types/vue';
import moment from 'Moment';

describe('Month Switcher Component Test', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(MonthSwitcher, {
      propsData: {
        baseMoment: moment().clone(),
      },
      mocks: {
        $moment: moment,
      }
    });
  });

  test('Emituje event po kliknięciu w poprzedni miesiąc',  () => {
    const icon = wrapper.find('.month-switcher .content .mdi-chevron-right');
    icon.trigger('click');

    expect(wrapper.emitted('next-month')?.length).toBe(1);
  });

  test('Nie możemy kliknąć w poprzedni miesiąc',  () => {
    const icon = wrapper.find('.month-switcher .content .mdi-chevron-left');
    icon.trigger('click');

    expect(wrapper.emitted('prev-month')?.length).toBe(undefined);
  });
});