import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProvinces,
  selectProvinces,
  clearProvincesData,
} from "../../api/provinces/provinces";

import { Autocomplete, TextField, CircularProgress } from "@mui/material";

const PROVINCE_LIST = [
  { name: "Thành phố Hà Nội", id: 1 },
  { name: "Thành phố Hồ Chí Minh", id: 79 },
  { name: "Tỉnh Thái Bình", id: 34 },
];

const SelectProvince = () => {
  const dispatch = useDispatch();
  const { districts, loading, error } = useSelector(selectProvinces);

  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
  const [selectedWardCode, setSelectedWardCode] = useState("");

  const selectedProvince = PROVINCE_LIST.find(
    (p) => p.id.toString() === selectedProvinceId
  );
  const selectedDistrict = districts.find(
    (d) => d.code.toString() === selectedDistrictCode
  );
  const wardList = selectedDistrict?.wards || [];

  const handleProvinceChange = (event, newValue) => {
    const id = newValue ? newValue.id.toString() : "";
    setSelectedProvinceId(id);
    setSelectedDistrictCode("");
    setSelectedWardCode("");
    if (id) {
      dispatch(fetchProvinces(id));
    } else {
      dispatch(clearProvincesData());
    }
  };

  const handleDistrictChange = (event, newValue) => {
    const code = newValue ? newValue.code.toString() : "";
    setSelectedDistrictCode(code);
    setSelectedWardCode("");
  };

  const handleWardChange = (event, newValue) => {
    const code = newValue ? newValue.code.toString() : "";
    setSelectedWardCode(code);
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
      {/* Tỉnh / Thành phố */}
      <Autocomplete
        options={PROVINCE_LIST}
        getOptionLabel={(option) => option.name}
        value={selectedProvince || null}
        onChange={handleProvinceChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tỉnh / Thành phố"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {/* Quận / Huyện */}
      <Autocomplete
        options={districts}
        getOptionLabel={(option) => option.name}
        value={
          districts.find((d) => d.code.toString() === selectedDistrictCode) ||
          null
        }
        onChange={handleDistrictChange}
        disabled={!selectedProvinceId}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Quận / Huyện"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Phường / Xã */}
      <Autocomplete
        options={wardList}
        getOptionLabel={(option) => option.name}
        value={
          wardList.find((w) => w.code.toString() === selectedWardCode) || null
        }
        onChange={handleWardChange}
        disabled={!selectedDistrictCode}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Phường / Xã"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {/* Địa chỉ cụ thể */}
      <TextField
        label="Địa chỉ cụ thể (số nhà, tên đường...)"
        variant="outlined"
        fullWidth
      />

      {/* Trạng thái */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}
    </div>
  );
};

export default SelectProvince;
