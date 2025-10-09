package com.example.baitapslink;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    EditText edtTen, edtTinChi;
    Button btnThem, btnCapNhat, btnXoa;
    ListView lv;
    ArrayList<Monhoc> mylist;
    MonHocAdapter adapter;
    int viTriChon = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Ánh xạ view
        edtTen = findViewById(R.id.edtTen);
        edtTinChi = findViewById(R.id.edtTinChi);
        btnThem = findViewById(R.id.btnThem);
        btnCapNhat = findViewById(R.id.btnCapNhat);
        btnXoa = findViewById(R.id.btnXoa);
        lv = findViewById(R.id.lvMonHoc);

        // Tạo danh sách rỗng ban đầu
        mylist = new ArrayList<>();
        adapter = new MonHocAdapter(MainActivity.this, R.layout.layout_item, mylist);
        lv.setAdapter(adapter);


        // Thêm môn học
        btnThem.setOnClickListener(v -> {
            String ten = edtTen.getText().toString().trim();
            String tinChiStr = edtTinChi.getText().toString().trim();
            if (ten.isEmpty() || tinChiStr.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập đủ thông tin", Toast.LENGTH_SHORT).show();
                return;
            }

            int tinChi = Integer.parseInt(tinChiStr);
            mylist.add(new Monhoc(ten, tinChi));
            adapter.notifyDataSetChanged();

            edtTen.setText("");
            edtTinChi.setText("");
        });

        // Chọn item trong list
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                viTriChon = position;
                Monhoc mh = mylist.get(position);
                edtTen.setText(mh.getTen());
                edtTinChi.setText(String.valueOf(mh.getSoTinChi()));
            }
        });

        // Cập nhật
        btnCapNhat.setOnClickListener(v -> {
            if (viTriChon == -1) {
                Toast.makeText(this, "Hãy chọn môn học để cập nhật", Toast.LENGTH_SHORT).show();
                return;
            }
            String tenMoi = edtTen.getText().toString().trim();
            String tinChiStr = edtTinChi.getText().toString().trim();

            if (tenMoi.isEmpty() || tinChiStr.isEmpty()) {
                Toast.makeText(this, "Không được để trống", Toast.LENGTH_SHORT).show();
                return;
            }

            int tc = Integer.parseInt(tinChiStr);
            mylist.get(viTriChon).setTen(tenMoi);
            mylist.get(viTriChon).setSoTinChi(tc);
            adapter.notifyDataSetChanged();
            Toast.makeText(this, "Đã cập nhật!", Toast.LENGTH_SHORT).show();
        });

        // Xóa
        btnXoa.setOnClickListener(v -> {
            if (viTriChon == -1) {
                Toast.makeText(this, "Hãy chọn môn học để xóa", Toast.LENGTH_SHORT).show();
                return;
            }
            mylist.remove(viTriChon);
            adapter.notifyDataSetChanged();
            edtTen.setText("");
            edtTinChi.setText("");
            viTriChon = -1;
            Toast.makeText(this, "Đã xóa!", Toast.LENGTH_SHORT).show();
        });
    }
}
