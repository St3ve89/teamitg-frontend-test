import getData from '..';
import { request } from '../helpers';

jest.mock('../helpers');

const mockedRequest = request as jest.MockedFunction<typeof request>;

describe('getData Tests', () => {
  const safelyCallApi = async () => {
    try {
      return await getData();
    } catch (e) {
      return null;
    }
  };

  it('Should fail if initial api call is failed', () => {
    mockedRequest.mockRejectedValueOnce('An error occurred');

    return expect(() => getData()).rejects.not.toBeFalsy();
  });

  it('Should make an api call to receive a list of general vehicle information', async () => {
    expect.assertions(1);
    mockedRequest.mockResolvedValueOnce([]);
    await safelyCallApi();

    expect(request).toBeCalledWith('/api/vehicles.json');
  });

  it('Should traverse and make further api calls on main results', async () => {
    expect.assertions(3);
    mockedRequest.mockResolvedValueOnce([
      { apiUrl: '/api/vehicle_ftype.json' },
      { apiUrl: '/api/vehicle_xj.json' },
    ]);
    mockedRequest.mockResolvedValueOnce({ id: 'ftype', price: '£36,000' });
    mockedRequest.mockResolvedValueOnce({ id: 'xj', price: '£40,000' });
    await safelyCallApi();

    expect(request).toBeCalledWith('/api/vehicles.json');
    expect(request).toBeCalledWith('/api/vehicle_ftype.json');
    expect(request).toBeCalledWith('/api/vehicle_xj.json');
  });

  it('Should ignore failed API calls during traversing', () => {
    mockedRequest.mockResolvedValueOnce([
      { apiUrl: '/api/vehicle_ftype.json' },
      { apiUrl: '/api/vehicle_xj.json' },
    ]);
    mockedRequest.mockResolvedValueOnce({ id: 'ftype', price: '£36,000' });
    mockedRequest.mockRejectedValueOnce('An error occurred');

    expect(safelyCallApi()).resolves.toEqual([
      { apiUrl: '/api/vehicle_ftype.json', id: 'ftype', price: '£36,000' },
    ]);
  });

  it('Should ignore vehicles without valid price during traversing', () => {
    mockedRequest.mockResolvedValueOnce([
      { apiUrl: '/api/ftype.json' },
      { apiUrl: '/api/xe.json' },
      { apiUrl: '/api/xj.json' },
    ]);
    mockedRequest.mockResolvedValueOnce({ id: 'ftype', price: '' });
    mockedRequest.mockResolvedValueOnce({ id: 'xe' });
    mockedRequest.mockResolvedValueOnce({ id: 'xj', price: '£40,000' });

    return expect(safelyCallApi()).resolves.toEqual([
      { apiUrl: '/api/xj.json', id: 'xj', price: '£40,000' },
    ]);
  });
});
