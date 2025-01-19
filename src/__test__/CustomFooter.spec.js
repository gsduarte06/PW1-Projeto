import CustomFooter from '@/components/CustomFooter.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';


describe('CustomFooter.vue', () => {
  it('calls openlinkOtherpage with the correct link when a button is clicked', async () => {
    const wrapper = mount(CustomFooter);

    const openlinkOtherpageSpy = vi.spyOn(wrapper.vm, 'openlinkOtherpage');
    

    const buttons = wrapper.findAll('v-btn');
    expect(buttons).toHaveLength(wrapper.vm.icons.length);

    // Simulate a click on the first button
    await buttons[0].trigger('click');

    // Check that `openlinkOtherpage` was called with the correct link
    expect(openlinkOtherpageSpy).toHaveBeenCalledWith(wrapper.vm.icons[0].link);
  });
});
