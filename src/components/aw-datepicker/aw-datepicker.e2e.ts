import { newE2EPage } from '@stencil/core/testing';

describe('aw-datepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<aw-datepicker></aw-datepicker>');
    const element = await page.find('aw-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the correct active day', async () => {
    const page = await newE2EPage();
    const currentDate = new Date();

    await page.setContent('<aw-datepicker></aw-datepicker>');
    const element = await page.find('aw-datepicker >>> .active');
    expect(element.textContent).toBeTruthy();
    expect(Number.parseInt(element.textContent)).toEqual(currentDate.getDay());
  });
});
