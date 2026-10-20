import audiA3 from "../../assets/Assets/Audi-A3-Right-Front-Three-Quarter-165478.jpg";
import audiEtron from "../../assets/Assets/Audi-etron-Exterior-170076.jpg";
import audiRs7 from "../../assets/Assets/Audi-RS7-Sportback-Right-Front-Three-Quarter-83816.jpg";
import audiA8 from "../../assets/Assets/Audi-New-A8-L-Exterior-170120.jpg";

export type CarListing = {
  id: string;
  name: string;
  year: number;
  price: number;
  displayPrice: string;
  kilometres: string;
  fuel: string;
  transmission: string;
  location: string;
  tag: string;
  image: typeof audiA3;
};

export const carListings: CarListing[] = [
  {
    id: "a3-2019",
    name: "Audi A3 Premium Plus",
    year: 2019,
    price: 28.5,
    displayPrice: "₹28.5 lakh",
    kilometres: "32,400 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Bengaluru",
    tag: "Sample listing",
    image: audiA3,
  },
  {
    id: "etron-2021",
    name: "Audi e-tron 55 quattro",
    year: 2021,
    price: 72.9,
    displayPrice: "₹72.9 lakh",
    kilometres: "18,200 km",
    fuel: "Electric",
    transmission: "Automatic",
    location: "Mumbai",
    tag: "Sample listing",
    image: audiEtron,
  },
  {
    id: "a8-2020",
    name: "Audi A8 L Technology",
    year: 2020,
    price: 114,
    displayPrice: "₹1.14 crore",
    kilometres: "27,800 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Delhi",
    tag: "Sample listing",
    image: audiA8,
  },
  {
    id: "rs7-2022",
    name: "Audi RS 7 Sportback",
    year: 2022,
    price: 185,
    displayPrice: "₹1.85 crore",
    kilometres: "12,600 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Hyderabad",
    tag: "Sample listing",
    image: audiRs7,
  },
];
