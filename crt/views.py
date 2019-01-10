from django.http import HttpResponse
import io
import matplotlib.pyplot as plt
import random
import numpy as np
from crt.models import Worker, Sale
#hardcoded for now

#linear chart
"""
def setPlt():
    count =  Popul.objects.count()
    x = [Popul.objects.get(id=s).Year for s in range(1,count+1)]
    y = [Popul.objects.get(id=s).Population for s in range(1,count+1)]
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set(xlabel='Year', ylabel='Population',
           title='Population on Andromeda throughout the years')
    ax.grid()
"""

def setPlt():
    
    names = [Worker.objects.get(id = x) for x in range(1, Worker.objects.count()+1)]
    year_tmp = Sale.objects.values('year').distinct().order_by('year')
    sales = []
    years = [x.get('year') for x in year_tmp]
    N = len(years)
    for x in names:
             for y in years:
                 sales.append(Sale.objects.get(worker = x, year = y).revenue)
    t = int(len(sales)/2)
    Hideo = sales[t:]
    Kojima = sales[: t]
    ind = np.arange(N)    # the x locations for the groups
    width = 0.35       # the width of the bars: can also be len(x) sequence
    p1 = plt.bar(ind, Hideo, width)
    p2 = plt.bar(ind, Kojima, width,
                bottom=Hideo)
    plt.ylabel('Revenue')
    plt.title('Revenue by worker')
    plt.xticks(ind, ('2016','2017', '2018'))
    plt.legend((p1[0], p2[0]), ('Hideo', 'Kojima'))

    
def pltToSvg():
    buf = io.BytesIO()
    plt.savefig(buf, format='svg', bbox_inches='tight')
    s = buf.getvalue()
    buf.close()
    return s

def get_svg(request):
    setPlt() # create the plot
    svg = pltToSvg() # convert plot to SVG
    plt.cla() # clean up plt so it can be re-used
    response = HttpResponse(svg, content_type='image/svg+xml')
    return response