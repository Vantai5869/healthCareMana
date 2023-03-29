import { useState, useEffect, memo } from 'react';
import axios from 'axios';
import "./styles.scss";

function LocationSelector({onChangAddress}) {
  const [cities, setCities] = useState([]);
  const [cityCode, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [districtCode, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState([]);
  const [wardCode, setSelectedWard] = useState('');

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleCityChange(event) {
    setSelectedCity(event.target.value);
    setSelectedDistrict('');
    setSelectedWard('');
    const selectedCityData = cities.find(city => city.Id === event.target.value);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
  }

  function handleDistrictChange(event) {
    setSelectedDistrict(event.target.value);
    setSelectedWard('');
    const selectedDistrictData = districts.find(district => district.Id === event.target.value);
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
  }

  function handleWardChange(event) {
    setSelectedWard(event.target.value);
  }


  useEffect(() => {
    onChangAddress({cityCode:+cityCode, districtCode:+districtCode, wardCode:+wardCode})
  }, [cityCode, districtCode, wardCode ])
  return (
    <div className="container">
      <select value={cityCode} onChange={handleCityChange}>
        <option value="">Chọn tỉnh thành</option>
        {cities.map(city => (
          <option key={city.Id} value={city.Id}>{city.Name}</option>
        ))}
      </select>

      <select value={districtCode} onChange={handleDistrictChange}>
        <option value="">Chọn quận huyện</option>
        {districts.map(district => (
          <option key={district.Id} value={district.Id}>{district.Name}</option>
        ))}
      </select>

      <select value={wardCode} onChange={handleWardChange}>
        <option value="">Chọn phường xã</option>
        {wards.map(ward => (
          <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
        ))}
      </select>
    </div>
  );
}

export default memo(LocationSelector) 