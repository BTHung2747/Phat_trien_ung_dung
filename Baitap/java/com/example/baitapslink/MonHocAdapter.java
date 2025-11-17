package com.example.baitapslink;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
public class MonHocAdapter extends ArrayAdapter<Monhoc>{
    Activity context;
    int IdLayout;
    ArrayList<Monhoc> myList;

    public MonHocAdapter(Activity context, int idLayout, ArrayList<Monhoc> myList) {
        super(context,idLayout,myList);
        this.context = context;
        IdLayout = idLayout;
        this.myList = myList;

    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater myflater = context.getLayoutInflater();
        convertView = myflater.inflate(IdLayout, null);
        Monhoc myMonhoc = myList.get(position);
        TextView tvTen = convertView.findViewById(R.id.txt_tenmonhoc);
        TextView tvTinChi = convertView.findViewById(R.id.txt_tinchi);
        tvTen.setText(myMonhoc.getTen());
        tvTinChi.setText(String.valueOf(myMonhoc.getSoTinChi()));

        return convertView;
    }







    }
