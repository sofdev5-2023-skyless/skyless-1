import { cleanup, render, screen } from '@testing-library/svelte';
import DoctorCard from '../../../src/lib/components/DoctorCard.svelte';

describe('DoctorCard component', () => {
	it('renders the doctor name correctly', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText } = render(DoctorCard, props);
		expect(getByText('John Doe')).toBeInTheDocument();
	  });
	  
	  it('renders the doctor speciality correctly', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText } = render(DoctorCard, props);
		expect(getByText('Cardiology')).toBeInTheDocument();
	  });
	  
	it('renders the doctor cellphone correctly', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText } = render(DoctorCard, props);
		expect(getByText('123456789')).toBeInTheDocument();
	  });
	  
	it('renders the default image correctly', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByAltText } = render(DoctorCard, props);
		expect(getByAltText('default')).toBeInTheDocument();
	  });
	  
	it('renders the doctor information correctly', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText, getByAltText } = render(DoctorCard, props);
	  	expect(getByText('John Doe')).toBeInTheDocument();
		expect(getByText('Cardiology')).toBeInTheDocument();
		expect(getByText('123456789')).toBeInTheDocument();
		expect(getByAltText('default')).toBeInTheDocument();
	});

	it('should render the correct title', () => {
		const { getByText } = render(DoctorCard, {
			props: {
				name: 'John',
				lastName: 'Doe'
			}
		});
		expect(getByText('John Doe')).toBeTruthy();
	});

	
});
