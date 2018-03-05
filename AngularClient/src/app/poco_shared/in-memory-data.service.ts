import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const fakeNews = [
      { key: 0,  value: 'Zero' },
      { key: 11, value: 'Mr. Nice' },
      { key: 12, value: 'Narco' },
      { key: 13, value: 'Bombasto' },
      { key: 14, value: 'Celeritas' },
      { key: 15, value: 'Magneta' },
      { key: 16, value: 'RubberMan' },
      { key: 17, value: 'Dynama' },
      { key: 18, value: 'Dr IQ' },
      { key: 19, value: 'Magma' },
      { key: 20, value: 'Tornado' }
    ];
    return {fakeNews};
  }
}
