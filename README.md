Hi there, this project is a simple react application for testing by jest framework and react testing library

## Jest_Framework

(1 Named file test for each component )

\_in some dir for file component test or inside **tests** folder

## describe And test case )

it() or test(): Defines an individual test case
describe(): Groups related test cases

Test Groups

describe('component', () => {
describe('feature', () => {
test('specific case', () => {
// Test code
});
});
});

## Only And Skip )

\_only: Used run test only for specific file
\_Skip: Used to run all tests never this test

## Types of test )

1* **Unit Test** : Test a single unit of code a function, a method
2* **Integration Test** : Test how multiple units of code work together
3* **End-to-End Test** : Test the entire application from start to finish
4* **Snapshot Test** : Test the visual representation of a component

///////

## **Unit Test**

## Common Matchers

// Exact equality
expect(value).toBe(2);
expect(value).toEqual({obj: 'value'});

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeCloseTo(0.3); // For floating points

// Strings
expect(str).toMatch(/regex/);
expect(str).toContain('substring');

// Arrays
expect(array).toContain('item');
expect(array).toHaveLength(3);

// Objects
expect(obj).toHaveProperty('property');
expect(obj).toMatchObject({partial: 'match'});

## Async Testing

// Promises
test('async test', () => {
return fetchData().then(data => {
expect(data).toBe('data');
});
});

## // Async/Await
test('async test', async () => {
const data = await fetchData();
expect(data).toBe('data');
});

// Done callback
test('async test', (done) => {
fetchData().then(data => {
expect(data).toBe('data');
done();
});
});

Setup and Teardown

beforeAll(() => {
// Runs before all tests
});

afterAll(() => {
// Runs after all tests
});

beforeEach(() => {
// Runs before each test
});

afterEach(() => {
// Runs after each test
});

## Mocking:

jest.fn(): Creates a mock function
jest.mock(): Mocks a module
jest.spyOn(): Creates a spy on an object method

Asynchronous testing:

async/await can be used directly in tests
.resolves / .rejects for testing Promises
waitFor function / wait for element to be visible for testing UI interactions

Custom Matchers

function toBeDivisibleBy(received, arguments) { // named func it is some custom matcher named
const pass = received % arguments === 0;
if (pass) {
return {
message: () => `expected ${received} not to be arguments success by ${arguments}`,
pass: true,
};
} else {
return {
message: () => `expected ${received} to be arguments faild by ${arguments}`,
pass: false,
};
}
}

// 2. Extend Jest's expect
expect.extend({
toBeDivisibleBy,
});

Using code coverage in Jest is a great way to ensure your tests are thoroughly exercising your codebase. Let's go through how to set up and use code coverage in Jest:

Basic Usage:

\_\_ NPM => jest --coverage

Jest has built-in code coverage reports. You can enable it by simply adding the --coverage flag when running Jest:

"jest": {
"collectCoverage": true,
"coverageReporters": [
"json",
"text",
"lcov",
"html"
],
"coverageDirectory": "coverage", // directly root
}

## RTL (React Testing Library)

React Testing Library (RTL) Guide for React Components
Table of Contents

File Structure
Test Structure
Test Types
Common Patterns
Examples
Best Practices

## File Structure

Copysrc/
├── components/
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.test.tsx
│ │ └── **snapshots**/
│ └── Input/
│ ├── Input.tsx
│ └── Input.test.tsx
└── **tests**/
└── integration/

## Test Structure

typescriptCopyimport { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
describe('Rendering', () => {
test('renders button with text', () => {
render(<Button>Click me</Button>);
expect(screen.getByText('Click me')).toBeInTheDocument();
});
});
});
Only and Skip
typescriptCopy// Run only this test
test.only('critical test', () => {});

// Skip this test
test.skip('not ready test', () => {});

// Run only this group
describe.only('critical feature', () => {}); 3. Test Types

## Unit Tests
    typescriptCopy// Button.test.tsx
    describe('Button Component', () => {
    test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

            fireEvent.click(screen.getByText('Click'));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

    });

## Integration Tests

typescriptCopy// Form.test.tsx
describe('Form Integration', () => {
test('submits form with input data', async () => {
const handleSubmit = jest.fn();
render(
<Form onSubmit={handleSubmit}>
<Input name="username" />
<Button type="submit">Submit</Button>
</Form>
);

        await userEvent.type(screen.getByRole('textbox'), 'testuser');
        await userEvent.click(screen.getByRole('button'));

        expect(handleSubmit).toHaveBeenCalledWith({
            username: 'testuser'
        });
    });

});

## E2E Tests (with RTL)

typescriptCopy// UserFlow.test.tsx
describe('User Registration Flow', () => {
test('completes registration process', async () => {
render(<RegistrationFlow />);

        // Fill form
        await userEvent.type(
            screen.getByLabelText(/username/i),
            'testuser'
        );
        await userEvent.type(
            screen.getByLabelText(/password/i),
            'password123'
        );

        // Submit
        await userEvent.click(screen.getByRole('button', {
            name: /register/i
        }));

        // Verify success
        expect(
            await screen.findByText(/registration successful/i)
        ).toBeInTheDocument();
    });

});

## Common RTL Queries

Priority Order

getByRole
getByLabelText
getByPlaceholderText
getByText
getByDisplayValue
getByTestId

typescriptCopy// Queries
const button = screen.getByRole('button');
const input = screen.getByLabelText('Username');
const heading = screen.getByText(/welcome/i);
const element = screen.getByTestId('custom-element');

// Async Queries
const asyncElement = await screen.findByText(/loaded/i);
const allButtons = screen.getAllByRole('button');
User Events
typescriptCopyimport userEvent from '@testing-library/user-event';

test('user interactions', async () => {
const user = userEvent.setup();

    await user.type(input, 'text');
    await user.click(button);
    await user.hover(element);
    await user.keyboard('{Enter}');

});

5. Testing Async Operations

typescriptCopytest('loads data', async () => {
render(<DataComponent />);

    // Wait for loading to finish
    await waitFor(() => {
        expect(screen.getByText('Data')).toBeInTheDocument();
    });

    // or use findBy
    const element = await screen.findByText('Data');
    expect(element).toBeInTheDocument();

});

6. Custom Jest Matchers

typescriptCopy// Custom matcher for RTL
expect.extend({
toBeValidInput(received) {
const pass = received.checkValidity();
return {
pass,
message: () => pass
? `Expected input to be invalid`
: `Expected input to be valid`,
};
},
});

// Usage
test('input validation', () => {
const { container } = render(<Input required />);
const input = container.querySelector('input');
expect(input).toBeValidInput();
});

7. Test Setup

typescriptCopy// setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
// Your global setup
});

afterEach(() => {
cleanup();
});

8. Best Practices

Query Priority:

Prefer getByRole over other queries
Use getByTestId as last resort

User Events:

Use userEvent over fireEvent
Simulate real user behavior

Async Testing:

Use findBy for async operations
Prefer waitFor for complex conditions

Test Structure:

Arrange-Act-Assert pattern
Clear test descriptions
Group related tests

Mocking:

Mock external dependencies
Use Jest mock functions
Keep mocks simple

Coverage:

Aim for meaningful coverage
Test edge cases
Test error states
