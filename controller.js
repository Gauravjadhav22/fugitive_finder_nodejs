import { cities, vehicles, duplicateVehicles } from "./data.js"
let selections = [];
let fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;

export const postSelections = (req, res) => {
    const { cop, city, vehicle, img_url } = req.body;

    // Check if the city is already selected
    if (selections.length >= 3) {
        return res.status(400).json({ error: 'Cops limit exceeded' });
    }
    if (selections.some(selection => selection.city === city)) {
        return res.status(400).json({ error: 'City already selected by another cop.' });
    }

    // Check vehicle availability and range
    const selectedVehicle = vehicles.find(v => v.kind === vehicle);
    const selectedCity = cities.find(c => c.name === city);

    if (!selectedVehicle || selectedVehicle.count === 0) {
        return res.status(400).json({ error: 'Vehicle not available.' });
    }
    if (selectedVehicle.range < selectedCity.distance * 2) {
        return res.status(400).json({ error: 'Vehicle range is not enough for a round trip.' });
    }

    // Deduct vehicle count and add selection
    selectedVehicle.count--;
    selections.push({ cop, city, vehicle, image: img_url });

    res.status(200).json({ success: true });
}


export const getResult = (req, res) => {
    const captured = selections.find(selection => selection.city === fugitiveLocation);

    if (captured) {
        res.json({ success: true, message: `Cop ${captured.cop} captured the fugitive in ${fugitiveLocation}!`, img_url: captured?.image,fugitiveLocation,cop:captured?.cop });
    } else {
        res.json({ success: false, message: ['The fugitive was not captured.', fugitiveLocation] });
    }
}
export const getSelections = (req, res) => {
    res.status(200).json(selections);
}


export const resetResult = (req, res) => {
    fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;
    selections = []
    vehicles.forEach((vehicle, index) => {
        vehicles[index] = { ...duplicateVehicles[index] };
    });

    res.json({ success: true, message: 'Successfully reset the result' });
}