import React from "react";
import "./SizeChart.css";
import sizeImg from "../assets/images/size_chart.jpg"; 

export default function SizeChart() {
  return (
    <div className="size-chart-page">
      <h1 className="title">LIBAAS SIZE CHART</h1>

      {/* Table */}
      <table className="size-table">
        <thead>
          <tr>
            <th>SIZE</th>
            <th>BUST (cm)</th>
            <th>WAIST (cm)</th>
            <th>HIP (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XS</td>
            <td>81.3</td>
            <td>71.1</td>
            <td>96.5</td>
          </tr>
          <tr>
            <td>S</td>
            <td>86.4</td>
            <td>76.2</td>
            <td>102</td>
          </tr>
          <tr>
            <td>M</td>
            <td>91.4</td>
            <td>81.3</td>
            <td>107</td>
          </tr>
          <tr>
            <td>L</td>
            <td>96.5</td>
            <td>86.4</td>
            <td>112</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>102</td>
            <td>91.4</td>
            <td>117</td>
          </tr>
          <tr>
            <td>XXL</td>
            <td>107</td>
            <td>96.5</td>
            <td>122</td>
          </tr>
        </tbody>
      </table>

      {/* Image */}
      <div className="size-img">
        <img src={sizeImg} alt="Size Measurement Guide" />
      </div>

      {/* Note */}
      <p className="size-note">
        Sizes can vary from 2-3 centimeters because they are measured by hand.
        1 inch = 2.54 cm.  
        The size mentioned on a label can differ from the one you have ordered.
      </p>
    </div>
  );
}
