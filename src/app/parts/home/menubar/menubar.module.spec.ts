import { MenubarModule } from './menubar.module';

describe('MenubarModule', () => {
  let menubarModule: MenubarModule;

  beforeEach(() => {
    menubarModule = new MenubarModule();
  });

  it('should create an instance', () => {
    expect(menubarModule).toBeTruthy();
  });
});
