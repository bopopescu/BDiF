script_path:"/home/mzhou/workspace/mh9898/zy/";

gen_time_grid: {[start;end;delta]
    a:`datetime$start;
    dcnt: `int$((`datetime$end - a)*24*60%delta);
    dt: (a + (delta%(24*60)) * (til dcnt));
    `grid set 
    flip (enlist `TIME) ! (enlist dt)
               }

load_trade_file: {[file_]
  `trades set
   ("SZFF"; enlist ",") 0: hsym "S"$ file_; }

save_csv: {[file_; table_]
    (hsym "S"$ file_) 0: .h.cd table_; }      

calc_vwap: { [ticker]
    tbegin:exec first TIME from trades;
    tend:exec last TIME from trades;
    gen_time_grid [tbegin;tend;1440];
    subtrades0: asc select from trades where SYMBOL=ticker;
    `subtrades set update vol_price: PRICE*VOLUME from subtrades0;
    `t set grid ,' (update CNT:i from subtrades) asof grid;
    `trade_bar set update volbar: sum each t[`CNT] _ subtrades[`VOLUME], vol_price: sum each t[`CNT] _ subtrades[`vol_price], CNT: deltas CNT from t;
    `res set update VWAP: vol_price%volbar from trade_bar;
    save_csv[script_path,(string ticker),".res.csv";res];
    }

load_trade_file [script_path,"data.csv"];
sym_list_: distinct (exec SYMBOL from trades);
/(calc_vwap[]':) (sym_list_ 0 1)
cnt: 0
total: count sym_list_
while[cnt < total;
    calc_vwap[sym_list_ cnt];
    cnt+:1;
    ]

