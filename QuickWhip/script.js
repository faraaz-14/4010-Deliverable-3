document.addEventListener('DOMContentLoaded', populateFilters);

//function for populating filters from mongoDB
async function populateFilters() {
    try {
        const response = await fetch('/api/filters');
        if (!response.ok) throw new Error('Failed to fetch filter options');
        const { makes, years, rateRanges, colors } = await response.json();

        populateDropdown('make', makes); 
        populateDropdown('year', years); 

        // Poulating rate with ranges given in index.html
        populateDropdown('rate', rateRanges.map(range => range.label));

        populateDropdown('color', colors); // Populate "Color" dropdown

        // Add listeners for Make dropdown
        document.getElementById('make').addEventListener('change', updateModelsDropdown);
    } catch (error) {
        console.error('Error fetching filters:', error);
    }
}

function populateDropdown(id, options) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = `<option value="">Select a ${id}</option>`;
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

async function updateModelsDropdown() {
    const make = document.getElementById('make').value;
    const modelDropdown = document.getElementById('model');
    modelDropdown.innerHTML = '<option value="">Select a model</option>'; // Reset models dropdown

    if (!make) return; // If no make selected then clear model dropdown

    try {
        const response = await fetch(`/api/models?make=${make}`);
        if (!response.ok) throw new Error('Failed to fetch models');
        const { models } = await response.json();

        models.forEach(model => {
            const opt = document.createElement('option');
            opt.value = model;
            opt.textContent = model;
            modelDropdown.appendChild(opt);
        });
    } catch (error) {
        console.error('Error fetching models:', error);
    }
}

async function queryVehicles() {
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const rateRange = document.getElementById('rate').value;
    const color = document.getElementById('color').value;

    const params = new URLSearchParams();
    if (make) params.append('make', make);
    if (model) params.append('model', model);
    if (year) params.append('year', year);
    if (rateRange) params.append('rateRange', rateRange); 
    if (color) params.append('color', color);

    try {
        const response = await fetch(`/api/vehicles?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch vehicle data');
        const vehicles = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (vehicles.length === 0) {
            resultsDiv.innerHTML = '<p>No vehicles found.</p>';
        } else {
            vehicles.forEach(vehicle => {
                const vehicleDiv = document.createElement('div');
                vehicleDiv.innerHTML = `
                    <p>VIN: ${vehicle.vinNumber}</p>
                    <p>Make: ${vehicle.make}</p>
                    <p>Model: ${vehicle.model}</p>
                    <p>Year: ${vehicle.year}</p>
                    <p>Rate: $${vehicle.rate}</p>
                    <p>Color: ${vehicle.color}</p>
                    <p>Status: ${vehicle.status}</p>
                    <hr>
                `;
                resultsDiv.appendChild(vehicleDiv);
            });
        }
    } catch (error) {
        console.error('Error querying vehicles:', error);
    }
}

