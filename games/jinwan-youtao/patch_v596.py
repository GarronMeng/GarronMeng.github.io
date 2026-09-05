from pathlib import Path
import re

p=Path("games/jinwan-youtao/index.html")
s=p.read_text(encoding="utf-8")
if "var QUEST_SYSTEM_VERSION='5.9.6'" in s:
    raise SystemExit(0)
if "var QUEST_SYSTEM_VERSION='5.9.5'" not in s:
    raise SystemExit("expected v5.9.5")

s=s.replace("var QUEST_SYSTEM_VERSION='5.9.5';","var QUEST_SYSTEM_VERSION='5.9.6';",1)

css=r"""
/* v5.9.6 — mobile text safety + room render assets */
.dialog,.sheet{overflow-x:hidden}
.choice,.choice strong,.choice small,.impactline,.roomaction,.roomaction strong,.roomaction small,.card,.card strong,.card small,.sheethead h3,.sheethead .sub,.roomdetailblock .guestline b{max-width:100%;overflow-wrap:anywhere;word-break:break-word;white-space:normal}
.choice strong{line-height:1.32}
.choice small,.roomaction small{display:block;line-height:1.42}
.impactline{display:block;width:max-content;max-width:100%;line-height:1.35}
.roomactions{grid-template-columns:repeat(2,minmax(0,1fr))}
.roomaction{min-width:0;overflow:hidden}
.roomdetailblock .guestline b{min-width:0}
#viewToggle{position:absolute;left:50%;transform:translateX(-50%)}
#explorerChip{position:absolute;right:0;top:38px;padding:4px 6px;font-size:8px}
"""
if "/* v5.9.6 — mobile text safety + room render assets */" not in s:
    s=s.replace("</style>",css+"\n</style>",1)

s=s.replace("Brand Explorer ","Explorer ")
s=s.replace("Engineering：","工程部：")
s=s.replace("Housekeeping：","客房部：")
s=s.replace("🔒 需要 Engineering + Housekeeping + 客房品质 Lv1","🔒 需要：工程部 + 客房部 + 客房品质 Lv1")
s=s.replace("👥 Engineering + Housekeeping · 客房品质就绪","👥 工程部 + 客房部 · 条件就绪")
s=s.replace("还需要 Engineering + Housekeeping，并把客房品质升到 Lv1。","还需要工程部、客房部，并把客房品质升到 Lv1。")

old="ctx.fillStyle=night?'#d7d3cf':'#f4e8d8';ctx.beginPath();ctx.arc(d.w-48,34,15,0,Math.PI*2);ctx.fill();if(!night){ctx.fillStyle='#d8aa54';ctx.beginPath();ctx.arc(d.w-48,34,10,0,Math.PI*2);ctx.fill()}"
new="ctx.fillStyle=night?'#d7d3cf':'#f4e8d8';ctx.beginPath();ctx.arc(d.w-30,31,10,0,Math.PI*2);ctx.fill();if(!night){ctx.fillStyle='#d8aa54';ctx.beginPath();ctx.arc(d.w-30,31,7,0,Math.PI*2);ctx.fill()}"
if old not in s:
    raise SystemExit("weather block missing")
s=s.replace(old,new,1)

asset_b64={'standard':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAAD9klEQVR42u3dL0wWcRwH4EMtTjdJbA6jbroZDGrSEQxWk0mTTguV8joJohSao+BskCwGkoE5pjOowaDoHBtFhiO9OtGim+F88YWXe1+O+/Pen+dJ7PZyvHzvs89+HPeDgaVX8wFUxT4jQKBBoEGgQaARaBBoEGgQaBBoBBrK7UDcTxhrPDA1cjM1eUdDY8kBAg2lX0O3e3h/NAiCQ4ND5kiKboyOa2hI3NChjeb65sfaGmtoKGqgN5rr7YUNGhr6uoa2qkZDQ3kaurOti9zTs5MTpbts1xt3ZVdDo6GtqtHQUPGGLktbD14bS+U8F8+dD4LgxZvXKb635tyUvGpoBDrftvabRTQ0FGYNXa5VNRoaBNqqGg0N5Qi0nkZDQzHuchRH+Bu+Yp5tfs710dBo6DpL6+mLLJ7lQEMj0CDQINAg0NCVuxxbpLUrxD1jDQ0CDQKNNXSV+StEGhoEGgQaBBqBBoEGgQaBBoFGoEGgQaBBoKGHRE/bfX7+1ARzNr2wuu3I6KVhY9HQaGgK0MdTt45vOzL2aFlna2g0NH3q5s5WjurssK3Dz61nT2toNDR56d7NUa/vXFVraNDQ8T17uewabLp84bghaGgQaAQarKFjmJx9UsML0Lh+dcfj4V3k8H7F7u91hK+PugNdnJ9YsvtpQUOjoVu+rP4wwRR1zvPKySNBnPvK4euLf12ye4caGg3dcmz4cMIv/2Fl5+MHB49WeOi/mmux5nli5Wsqq9KoaeevR3I+fdPQINAINAg0CDQINAIN1WHHSkHFfe6i8/Wdd6bbj0SdP/lTFtmdWUNjyQECDQINAg0CjUBDKRV0x0rUE8PVlu4893a27K5pPvtoNDQauiW7HSv11D7P5JPpfnWizj+zNrSHrzVx9mfPM8dIix0rkEJDZ2f88WSFh37vZqO2gVvY/7+nL/1Jf1WtodHQkKyb24+k29MaGg0NXSI1cmbz49+L77YdiWrutHpaQ6OhqXer5O7dnAUNjYaGXt3cLxqaShFoBBoEGgQa4vE/VgqkCDtWyv69a2g0dEu6O1ai/mNf9TQWr/acZ792rPTLlndrxwqk0NBkJ5+/1ZmP7s/ceR4aNDRZClu284mOf7snbwZBXvtENTQa2kqxumv0l2+T9vTI7Z2buH2v++JMVvveNTQauh/ef1wv3XBPnxoq3Xtu/xtIZaShqRSBRqBBoEGgQaARaKgGO1YyZD75T0ZDo6Fbku9Y2b3m9/L9BivP+VRqMnasQAoNnacyPhdRT9k9SaehqR2BRqBBoEGgIZ5EdzmmF1ZNEA0NAg0CTd0MLL2aNwU0NAg0CDQINAINAg0CDQINAo1Ag0CDQINAQzd/ASC7CeJu3x1FAAAAAElFTkSuQmCC','suite':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAAEV0lEQVR42u3dPWgUWQAH8PGjEQ9MpRyxVFCwsFArxSKFxTVWViccnJxNKiEIK6bQM3AErjjSeFgcaGVjEa5QCBIuWHjNFaf3oWBjUFOtoh6CgsXcxk12Zzfjvpl9M/v7VWHYney++fPnZfLe7qaH9+YTqIvNhgCBBoEGgQaBRqBBoEGgQaBBoBFoqLateZ8w1bhi1CjN7MwFDY0pBwg0lH4O3e6n7yeTJNk+ttM4EtC3k9MaGgZu6NSb5srqz9oac2iINdBvmivthQ0aGoY6hzarRkNDdRq6s61j7unrM5crd9lONy7KroZGQ5tVo6Gh5g1dlbYe+3oqyHmOHT6SJMlvv98P+NqaN2blVUMj0OW2tf8soqEhmjl0tWbVaGgQaLNqNDRUI9B6Gg0NcdzliEf6H744zzZ/w/XR0GjoURZq9UURaznQ0Ag0CDQINAg09OQuxxqhdoW4Z6yhQaBBoDGHrjOfQqShQaBBoEGgEWgQaBBoEGgQaAQaBBoEGgQa+hhotd2/d28ZwZLNLSyvOzI5MW5YNDQamgj6ePa7PeuOTP38WGdraDQ0Q+rmzlbO6uy0rdPnjmZPa2g0NGXp3c1Zj++cVWto0ND53V567BqsOnF0j0HQ0CDQCDSYQ+cwc/3mCF6AxulTXY+nd5HT+xUbv9eRPj7rDnQ8f7EU99eChkZDtzxdfm0EA+ocz5P7diR57iunj4//uhT3CjU0Grpl9/gXA/76B0+6H9829mWNB/2/5rNc47n3yfMgs9Ks0S5fn+T8/VJDg0Aj0CDQINAg0Ag01IcdK5HKu+6i8/Gdd6bbj2Sdf/BVFsWdWUNjygECDQINAg0CjUBDJUW6YyVrxXC9hR3Pzztbcde0nH00GhoN3VLcjpXR1D6eg49M76uTdf6rz3Z+xu+6fOht3zPnSIsdKxCgoYszfW2mxoN+6UxjZAO3sOVTT098CD+r1tBoaBism9uPhO1pDY2Ghh6ROn5w9ef3i3+sO5LV3KF6WkOjoWFjs+Te3VwEDY2Ghn7dPCwamloRaAQaBBoEGvLxHSsRiWHHStXfu4ZGQ7eE3bGS9Y199dNYPNV3PIe1Y2VY1rxaO1YgQENTnHI+q7McvdfcWQ8NGpoipS3buaLj/92TZ5KkrH2iGhoNbaYY2tzCcpIkjxaWS/yd27oe3fXuUd9nvtixt0dPHz/bvYnb97ovXi1q37uGRkMPw59/rVRucA/sz/cpRD9cOhf5Ozo//WOy9nOSYqOhqRWBRqDBHJpcfln6dcAzfHP0q4LOlsr6PsLbS/nW5IS906WhMeUAgYbY59B2rIzm+MS8s0ZDo6FbBt+xsnHNV28rN7jlfKvIsN5XqD0vXUbJjhUI0NBlyrsugtGkodHQFCNdyxbsbHf+KfRsca5l19BoaEKbnBg3CBoagjb0XKl74EBDI9Ag0BCFTQ/vzRsFNDQINAg0CDQCDQINAg0CDQKNQINAg0CDQEMvHwHREyj5U788iQAAAABJRU5ErkJggg==','breakfast':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAADmElEQVR42u3dPWsUQQAG4I0KokkRG0Ej6Swt1Uqb/AYLRUkhWKUNSkQLP4KSTlIJFsGghYVFahEUAmopBKOdGIU0RkgUC8UiJJw542WzO3Mzm+epjuOSm5t7eZm729ntmZudKaApdpkCBBoEGgQaBBqBBoEGgQaBBoFGoCFve8r+wejYbbNGNBPjVzU0lhwg0JD9GrrVvVsjRVH09h80j9To4sh1DQ2VG3rVytLi+m1tjTU0pBrolaXF1sIGDQ1dXUNbVaOhIZ+Gbm/rlHv64fjN7N62C2PXZFdDo6GtqtHQ0PCGzqWt+8+P1vJ/Th0/URTFyzevaxzb0vSEvGpoBDpuW/tlEQ0Nyayh81pVo6FhZzd0e1vr6RRU2TmymQeTNzQ0ZNvQejo1X77X03qH9v+2hoZGNHS3rP7Cl+Z/m5n2/mhoNPROVtfRFyGO5UBDo6Fhc4+fPCr1+LNnzmloEGgQaKyhG66uXSG+M9bQINAg0FhDN5mzEG1d/O+VNTSWHCDQINAg0CDQCDQINAg0BOKXQjqIcz4NDQ0amjJCn4dOQ0PIhn7//KkZREODQINAI9Ag0JCG4N9DTz5bMMsURTEyNKChIbGGXnV074/12y++9gZ9rtMHVv55/6XhY0Gf9/7U2w33XL4zHO2NvHtlasM9Jw8PdiVSrz5/3HDPh5/7rKFBoBFoU4BAg0BDeJW+5fi0sGwGSSotGhoNvebIQF/nB737ZpbZaloqZ0ZD40MhCDQINAg0Ag0CDcnpwpmTNjteObT245VDaz9GOab245I1NAg0CDTktIaOuasMDQ0aemvinI0BNDQa+m92rKChIdWGLrEHAbbOjhUQaAQaBBoEGgQagTYFCDQINITXhT2Fca6LFe4ov5jX9ar3VeQ7cg2Nho6r9bpY9YqzOybc+EO/inxHrqHxoRAEGpqwhk55x0ozdtPk+yq6NXINjYZes80dK1GuuhJwN03Eq8bU/CpyGbkdKyDQCDQ0eA1dRe5nu8t3/M0+z6CGRkNX03oc1rPdnT8LD/1a3vbjjb9JM6+h8aEQBBoEGgQaBBqBBoEGgYYadXvHymBfuWcp+/jQ8h1/7jOvodHQHVTfTzFf8lnmo4xqJ4w/6ZHbsQICjUBDg9fQ1ZU9gjaFI26bMf7cZ15DY8kBAg25rqFjnhEeNDQCDQINieiZm50xC2hoEGgQaBBoBBoEGgQaBBoEGoEGgQaBBoGG//kDJRLqOWJhNncAAAAASUVORK5CYII=','club':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAADmElEQVR42u3dzUsUYQAH4LGiiILsEoFRBynrD6hTnYrOXoPqYkfpEnrYPpA+9qB0CY95KaFjgdekQ+Gh7mKGhyRBvKSQRELRYWuZFKcd52NnZp/ntKz2svP648fb7LwzXbMzUwFUxS5TgECDQINAg0Aj0CDQINAg0CDQCDSU2564/2Co9siskZux+m0NjSUHCDSUfg0d9uThYBAEB7qPmEdSNDB4T0ND4oZuWF9dab7W1lhDQ1EDvb66Ei5s0NDQ1jW0VTUaGsrT0Fvbusg9/bz+oHR/tmu1u7KrodHQVtVoaKh4Q5elrbuvDqUyzoWz54IgePvhfYqfbXVyTF41NAKdb1v7ZhENDYVZQ5drVY2GBoG2qkZDQ3vW0DfvjOd2SBPj9/1dNTRo6Jj6h2uZjv9qtJ5whMY3fGlJd7SpSXHV0GjoTpbW1RdZXMuBhkagQaBBoEGgIZKzHP9Ia1eIc8YaGgQaBBpr6CpzFyINDQINAg0CjUBDJeR6liP5jhLQ0GjotDWeORuXuyihoRFoEGgQaBBoaFmisxzzb16aQTQ0FLKhyc749FKFj27wYo+GBg1dcod3/6rYEX39mW2Hamg0NO1TGzgV8dP6xHzz9fnjeyN+893iRvP18PW+iN8cffax+br3aNSYC8sbbZ8fDU2lCDQCDQINAg0CjUBDNSQ6D/1l6ZsZpFDJ0dBo6L+O9Rw0g1mZW6vwwf0nOQmOXUPjP4Ug0CDQINB0MNdDl0z4iudo4Sueo4WveI5WhCueNTSWHCDQINAg0LANZzkKLeu7WGho0NDEl93d3zQ0dEZD27GChoaiNnQrO1aqcZ9jK9pc2bECKTR06x6PjpR0gm4Nj0iJNTQINAg0CDQCDQINAg0CDQJN9bgeOlcnevdveufzwnfToqFBQxesm9HQkGVDd86OleRHul1D2/WjoSGbhm7pGStbdh88ff0ilY9+49KV3EZO/jSZxtmMcE833vGcmlYyo6HR0OxUjH2T0zsZ345GDY2GJpmT+9L/zu/TD2evNTQCDQINAg0CDQKNQINAg0BDJnL6pjB8D88zl/tSHzPrkdHQULaGbmW3Rf/pQ5vfWlxO5aP35Thye/eV2NWiodHQ8dlt8cfcWpDllXEdN892rEAKDU2DHSXW0CDQINAINAg0FECisxzVeI43GhoEGgQaYumanZkyC2hoEGgQaBBoBBoEGgQaBBoEGoEGgQaBBoGGKL8BNRfBMMZ1MFsAAAAASUVORK5CYII=','gym':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAAEcUlEQVR42u3dTWsVZxgG4DfFUkgEgwVBdCv4A1TcuOof6A9ocdFtNoLZ+LUwmoURBMnWRan7BrIuCgUp6lrErV8gKhFMNgHbxZh00umczJnPd2auaxHCOTmTyZzb2ydz5j2ZefZoPcBQfOMQINAg0CDQINAINAg0CDQINAg0Ag39dmDaByxeuumo0ZqV5csaGiMHCDT0foZOu3tjIYQwN3/EcaRGvyxc09BQuaETmxvvdj/X1pihIdZAb268Sxc2aGjodIY2VaOhoT8NnW3rmHv6t+WlRrf/8M32qCJ1b/W6hoaeNLSpOnH+4pXB/4y/3r5hhoYeNnRf2nr+p8VatnPu9JkQwp9PHocQwq1lOdPQ0MNAe2URDQ0xzdD9mqrR0CDQpmo0NPQj0HoaDQ1xnOWIR/IKX71bW3NYNTRo6Bp8vfqipm6ua2toaAQaBBoEGgQaCnCWY4+N+yu1bGf9vmOpoUGgQaAxQw/Xz5euNrr9hxXejx4NjUCDQIMZerxieN83DQ0amr26fb9kDQ0CDQINAg0CjUCDQEPHKp2HfvHgd0cQDQ0CDQKNQINAQxyiuNruzl/bpR974ey3nkU0NAINAg0Dn6GrTMygodHQ3XHWAg0NdTT0q9efSz3uuwa2yX+tPf+0+/mPJw9paBhZQx8/drDMw15u179NQgghrP7xeghHNfV/i4ZGQzPEbl744dju7cnH5BYzNGhouu7mcdLQaGjG2s15Z1Gm1dx+amg0NDG1cvtz89ut8j14dPaLGRo0tIk59TXNnY3+8PFjCOH7w4cn3JvI+xoNDRp6fN3ctHT7Zns6fW/6lqOz8xoaNHSUzZo34xZ/7LTdnN3OsF9Z1NBo6B1WrORJVou8+vz3VA2arCtZy7kaOLm3+PFJ78PxgzP/HuHMXmX3oYhkYs47y5G+N31LCF8afZY1NBp6x+R1ELkT5NyRfXslHuVm1iLdnO3L7M9ebrqtvg+53zezh5PPLufdu88KGitWoKWzHP/zuv/W+178G5v2qoNpe3FPY6Vm3Ca6OT1JJx/z9jO5vb8rXDQ0Gpo6ujnbyu3vQxXZ1wKzE7NrOUBD9022m/PODXc1xVafpF3LAX1o6KZXKAyvm4dh8iuFGhq6bugxvztE8Tm1v9+xyFmLds5saGg0NP1s5bHR0GhompScCen2N5Di+2DVN8Ta0P4eSiK90qSuKXnaY9v+PlRZ9W3FCjTf0P4eyh6V19rUMD03vQ81rSeyYgWab2jS0u8iV+7a6OpnNtrchyqrvpujodHQFOvIr+cKcpoyfeVdvWed29yHcqu+NTRo6K57OtHVe+7HsA/t09Bo6JhcfTob+y4eOpGz52U2tnRqq2JbVxfzKiQNjYbG7wYaGgQaBBqBBoGG6AxgxcrsqJ4wq4Q0NBq6mChWrLwd1xM2ilVCVqyAQCPQMOAZOgblrj5DQ4NAg0BDNzN07l/zBg0NAg0CzXDNPHu07iigoUGgQaBBoBFoEGgQaBBoEGgEGgQaBBoEGib5B+DNtgDlhZusAAAAAElFTkSuQmCC','spa':'iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAIAAAC9uXYyAAAEVklEQVR42u3dO2jUcBwH8PgAER06udRRETcXnRSHgk6OFgQfg8Wpi0iXEx18dCkiiIviohWEOjh0cihSKh10cRJRR7t0qqCIoOAQT9NHrmkvyT+Pz2eSa3o9kq/f/C6Xf7vl/fx0BE2x1S5AoEGgQaBBoBFoEGgQaBBoEGgEGupt+0a/Yaxz216jNBPjVzU0Rg4QaKj9DJ1079ZoFEW7BvbYj+To4uh1DQ19N3Ts+9Liv39ra8zQUNVAf19aTBY2aGgIOkObqtHQUJ+GXt3WVe7pyfGbtTts5zrXZFdDo6FN1WhoaHhD16WtB86O5fI8xw4fiaJo7u2bHF/b0tMJedXQCHS5be2TRTQ0VGaGrtdUjYYGgTZVo6GhHoHW02hoqMZVjuqIP+Gr5rNNP3V8NDQaus3yuvuiiHs50NAINAg0CDQINPTkKscyea0Kcc1YQ4NAg0Bjhm4yv4VIQ4NAg0CDQCPQINAg0CDQINAINAg0CDQINKyjr7vtPr56YQ+ioaGSDZ3m/sxCjs82OjToOKGh0dC52r/jR5/P8OnnTkeohPNn8hyY79m1/HOvhkZDU+c+nri0b8UjYw8/5352DXXu1dBoaOrWzatbOa2z47aOG7TontbQELqh707PbeK7Lp865tjkonc3p22/eqrW0GCGpg6yXKMINX9raDR015eFbyW8xHJ+Ctlb+c6TZ+tuf+X8mXXbuogjq6HR0F17B3ev/YUPX3N8iak/hZ5GB3dH3esV2a91xNundWqWbk5umezpcvKjodHQG+GKcuCeHhqM+ruuHE/P2bs5rafLue6hodHQ1LOnYy9fr2zrk0f/T9hl3g+toUFD05949o3n4I1O0mVOzxoaDb1xRdxtV/c5L3Tjbv57s/d07yvQGhqaPkM/n3rs+G1C59zwpifp7O3rbjtod0MTbgqv7lpDDU2jCDQCDY2cobOsOOj/bjsrVooWag9bsQJFNnSwFSu5Pj/L9nCJ+9aKFRBoBBraOENn4XfboaGhqg1N1YxPTkVRdHr4QpTfXznZfvzQmo//mn2noUFDEypAKd2c/GqZPa2h0dC0u4PLn4w1NBq6GK4oN28+Ln8y1tBo6Ka4/mjccf3nxkin5P4O2+gaGg3d5W+s1F3avs3evlU7shoaDd1lxUrdhd23VqyAQCPQ0MYZOqz4jt7VDp444Liuu5c0NGjoYvReZzHjqGbeV2niT/V6X43Osk1ySw0NbZqh0wz99sliv+K/Hnuw722SW2poqFJDl/n/kkJm7t/foiia2bby87y/d/CN/H8k7Q7H+Gw5lNPacg2Nhg73zpoqvyeJezrt7ur48WRPh3ono6HR0LS1p3uLe3r2QSfg69TQaOgua0moWio0NBq6K3XFAS2WQyqsWAGBRqChwTM0bRP2GrOGxsgBAg1NmKHvzyzYg2hoEGgQaNpmy/v5aXsBDQ0CDQINAo1Ag0CDQINAg0Aj0CDQINAg0NDLH6qhOzYkqPgdAAAAAElFTkSuQmCC'}
js="var roomRenderData={"+",".join([repr(k)+":'data:image/png;base64,'+"+repr(v) for k,v in asset_b64.items()])+"};\n"
js+="var roomRenderImages={};Object.keys(roomRenderData).forEach(function(k){var im=new Image();im.decoding='async';im.onload=function(){roomRenderImages[k]=im;draw()};im.src=roomRenderData[k]});\n"
anchor="function drawRoomSpriteInCell(r,q,locked){"
if "var roomRenderData=" not in s:
    if anchor not in s:
        raise SystemExit("room sprite anchor missing")
    s=s.replace(anchor,js+anchor,1)

start=s.find("function drawRoomSpriteInCell(r,q,locked){")
end=s.find("function suitesFree()",start)
if start<0 or end<0:
    raise SystemExit("room render range missing")
replacement=r"""function drawRoomSpriteInCell(r,q,locked){
  if(locked||!r.type)return false;
  var im=roomRenderImages[r.type];
  ctx.save();ctx.beginPath();ctx.rect(q.x+3,q.y+15,q.w-6,q.h-28);ctx.clip();
  if(im&&im.complete){
    ctx.imageSmoothingEnabled=false;
    ctx.drawImage(im,q.x+3,q.y+15,q.w-6,q.h-28);
    ctx.fillStyle=r.occupied?'rgba(221,201,129,.12)':'rgba(255,255,255,.02)';
    ctx.fillRect(q.x+3,q.y+15,q.w-6,q.h-28);
  }else drawMiniInterior(ctx,r.type,q.x+4,q.y+15,q.w-8,q.h-28,r.occupied?0.76:0.9);
  ctx.restore();return true;
}
function drawRoomPreview(r){
  var cv=$('roomPreviewCanvas');if(!cv||!r||!r.type)return;
  var c=cv.getContext('2d'),w=cv.width,h=cv.height,im=roomRenderImages[r.type];
  c.clearRect(0,0,w,h);var g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#243342');g.addColorStop(1,'#171d23');c.fillStyle=g;c.fillRect(0,0,w,h);
  if(im&&im.complete){
    c.imageSmoothingEnabled=false;
    var pad=14,ar=im.width/im.height,tw=w-pad*2,th=h-pad*2;
    if(tw/th>ar)tw=th*ar;else th=tw/ar;
    c.drawImage(im,(w-tw)/2,(h-th)/2,tw,th);
  }else drawMiniInterior(c,r.type,50,16,w-100,h-40,1);
}
"""
s=s[:start]+replacement+s[end:]

p.write_text(s,encoding="utf-8")
