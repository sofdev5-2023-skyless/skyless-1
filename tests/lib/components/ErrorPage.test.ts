import { cleanup, render, screen } from '@testing-library/svelte';
import ErrorPage from '$lib/components/ErrorPageComponent.svelte';

describe('Error Page component', () => {
  afterEach(cleanup);

  test('renders the image with the correct source and alt text', () => {
    render(ErrorPage);

    const image = screen.getByAltText('Hospital Logo');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://img.freepik.com/free-icon/hospital_318-186978.jpg');
  });

  test('renders the heading with the correct text and styling', () => {
    render(ErrorPage);

    const heading = screen.getByRole('heading', { level: 1, name: /Oops, something went wrong!/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'mb-4', 'text-purple-800');
  });

  test('renders the paragraph with the correct text and styling', () => {
    render(ErrorPage);

    const paragraph = screen.getByText(/We apologize for the inconvenience. Please try again later./i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-lg', 'mb-8', 'text-gray-700');
  });

  test('renders the link with whole  correct text, href, and styling', () => {
    render(ErrorPage);

    const link = screen.getByRole('link', { name: /Go back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(window.location.origin + '/');
    expect(link).toHaveClass('px-4', 'py-2', 'bg-green-800', 'text-white', 'rounded-md', 'shadow-md');
  });
  test('renders the error page with correct content', () => {
    render(ErrorPage);
    const image = screen.getByAltText('Hospital Logo');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://img.freepik.com/free-icon/hospital_318-186978.jpg');

    const heading = screen.getByRole('heading', { level: 1, name: /Oops, something went wrong!/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'mb-4', 'text-purple-800');

    const paragraph = screen.getByText(/We apologize for the inconvenience. Please try again later./i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-lg', 'mb-8', 'text-gray-700');

    const link = screen.getByRole('link', { name: /Go back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(window.location.origin + '/');
    expect(link).toHaveClass('px-4', 'py-2', 'bg-green-800', 'text-white', 'rounded-md', 'shadow-md');
  });
});
