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

	it('should render the updated name and last name when props are changed', () => {
		const { getByText, rerender } = render(DoctorCard, {
		  props: {
			name: 'Jane',
			lastName: 'Smith'
		  }
		});
	  
		expect(getByText('Jane Smith')).toBeTruthy();
	  
		rerender({
		  props: {
			name: 'Mark',
			lastName: 'Johnson'
		  }
		});
	  
		expect(getByText('Mark Johnson')).toBeTruthy();
	  });
	
	
	it('should not render the link when `cellphone` prop is not provided', () => {
		const { queryByText } = render(DoctorCard);
		expect(queryByText('123-456-7890')).toBeNull();
	});

	it('should render the correct link with different valid `cellphone` values', () => {
		const { getByText } = render(DoctorCard, {
		  props: {
			cellphone: '111-222-3333'
		  }
		});
		expect(getByText('111-222-3333')).toBeTruthy();
	});
	
	it('should render the correct link', () => {
		const { getByText, getByTestId } = render(DoctorCard, {
			props: {
				cellphone: '123-456-7890'
			}
		});
		expect(getByText('123-456-7890')).toBeTruthy();
	});

	it('displays the ReminderForm component', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText } = render(DoctorCard, props);
	  
		expect(getByText('Book Medical Appointment')).toBeInTheDocument();
	});
	
	it('displays the "Fecha:" text', () => {
		const props = {
		  id: '1',
		  name: 'John',
		  lastName: 'Doe',
		  speciality: 'Cardiology',
		  cellphone: '123456789',
		};
	  
		const { getByText } = render(DoctorCard, props);
	  
		expect(getByText('Fecha:')).toBeInTheDocument();
	  });

	
});
