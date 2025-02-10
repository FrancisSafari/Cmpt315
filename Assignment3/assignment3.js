// Task 1: 
const summarizeOrders = (orders) => {
    return orders.map(({ id, customer, products }) => {
        return {
            orderId: id,
            customer,
            totalAmount: products.reduce((sum, { price, quantity }) => sum + price * quantity, 0),
            categories: products.reduce((acc, { category, quantity }) => {
                acc[category] = (acc[category] || 0) + quantity;
                return acc;
            }, {})
        };
    });
};

// Input
const orders = [   
    { id: 101, customer: "Alice", products: [
        { name: "Laptop", category: "Electronics", price: 1200, quantity: 1 },
        { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
        { name: "Notebook", category: "Stationery", price: 5, quantity: 5 }
    ]},
    { id: 102, customer: "Bob", products: [
        { name: "T-shirt", category: "Clothing", price: 20, quantity: 3 },
        { name: "Jeans", category: "Clothing", price: 40, quantity: 1 },
        { name: "Cap", category: "Accessories", price: 15, quantity: 2 }
    ]}
];

console.log("Task 1 - Order Summaries:", summarizeOrders(orders));



// Task 2: 
const getTopPerformers = (employees, criteria) => {
    const { department, minPerformance, minExperience, maxSalary } = criteria;

    return employees
        .filter(({ department: dept, performanceRating, yearsOfExperience, salary }) =>
            dept === department &&
            performanceRating >= minPerformance &&
            yearsOfExperience >= minExperience &&
            salary <= maxSalary
        )
        .sort((a, b) => b.performanceRating - a.performanceRating || a.salary - b.salary);
};

const employees = [
    { id: 1, name: "John", department: "Sales", salary: 60000, yearsOfExperience: 4, performanceRating: 85 },
    { id: 2, name: "Jane", department: "Sales", salary: 55000, yearsOfExperience: 5, performanceRating: 90 },
    { id: 3, name: "Alice", department: "IT", salary: 70000, yearsOfExperience: 3, performanceRating: 88 },
    { id: 4, name: "Bob", department: "Sales", salary: 50000, yearsOfExperience: 6, performanceRating: 85 }
];

const criteria = { department: "Sales", minPerformance: 80, minExperience: 3, maxSalary: 70000 };
console.log("Task 2 - Top Performers:", getTopPerformers(employees, criteria));


// Task 3: 
const regionalSalesSummary = (salesRecords) => {
    return salesRecords.reduce((acc, { region, salesperson, salesAmount }) => {
        if (!acc[region]) {
            acc[region] = { totalSales: 0, salespeople: new Set(), salesCount: 0 };
        }
        
        acc[region].totalSales += salesAmount;
        acc[region].salespeople.add(salesperson);
        acc[region].salesCount++;

        return acc;
    }, {});
};


const formatSalesSummary = (salesRecords) => {
    const summary = regionalSalesSummary(salesRecords);
    
    Object.keys(summary).forEach(region => {
        summary[region].averageSales = summary[region].totalSales / summary[region].salesCount;
        summary[region].salespeople = Array.from(summary[region].salespeople);
        
        
        delete summary[region].salesCount;
    });

    return summary;
};

// Input
const salesRecords = [
    { region: "North", salesperson: "John", salesAmount: 5000, date: "2024-01-15" },
    { region: "South", salesperson: "Alice", salesAmount: 7000, date: "2024-01-20" },
    { region: "North", salesperson: "John", salesAmount: 3000, date: "2024-02-10" },
    { region: "North", salesperson: "Doe", salesAmount: 4000, date: "2024-03-05" }
];

console.log("Task 3 - Regional Sales Summary:", formatSalesSummary(salesRecords));


// Task 4: 
const deepFlattenAndExtract = (input) => {
    if (Array.isArray(input)) {
        return input.reduce((acc, item) => acc.concat(deepFlattenAndExtract(item)), []);
    } else if (typeof input === "object" && input !== null) {
        return Object.values(input).flatMap(deepFlattenAndExtract);
    } else if (typeof input === "number") {
        return [input];
    }
    return []; 
};

// Input 
const input = [
    1,
    [2, 3, { a: 4, b: "ignore" }],
    { c: 5, d: [6, { e: 7 }] },
    "text",
    [8, [9, 10]]
];

console.log("Task 4 - Deep Flatten and Extract:", deepFlattenAndExtract(input));


// Task 5: 
const analyzeStudentPerformance = (students) => {
    // Extract all scores from all students into a single array
    const allScores = students.flatMap(({ scores }) => scores);

    return {
        highestScore: Math.max(...allScores),
        lowestScore: Math.min(...allScores),
        overallAverage: allScores.reduce((sum, score) => sum + score, 0) / allScores.length,
        studentAverages: students
            .map(({ name, scores }) => ({
                name,
                average: scores.reduce((sum, score) => sum + score, 0) / scores.length
            }))
            .sort((a, b) => b.average - a.average) // Sort in descending order
    };
};

// Input
const students = [
    { name: "Alice", scores: [85, 92, 78] },
    { name: "Bob", scores: [88, 76, 95] },
    { name: "Charlie", scores: [90, 85, 80] }
];

console.log("Task 5 - Student Performance Analysis:", analyzeStudentPerformance(students));

