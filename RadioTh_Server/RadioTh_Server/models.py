from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

ASC_CHOICES = [None, "Very Low", "Low", "Moderate", "High"]
TECHNIQUES = ["VMAT", "3D", "2D", "electron", "IMRT"]
ENERGY = ["6MV", "16MV", "6fff", "10fff", "6MeV", "9MeV", "12MeV", "16MeV", "6/16MV"]
TX_QA = [None, 'HH', 'WB', 'GR', 'SC']


class Treatment(models.Model):
    """Treatment model the players belong to"""
    MRN = models.CharField(blank=False, max_length=20)
    CreatedOn = models.DateTimeField(auto_now_add=True)
    PlanName = models.CharField(blank=False, max_length=20)
    ASC = models.CharField(blank=True, max_length=200, choices=[(item, item) for item in ASC_CHOICES], default=None)
    Technique = models.CharField(blank=False, max_length=200, choices=[(item, item) for item in TECHNIQUES], default="VMAT")
    Energy = models.CharField(blank=True, max_length=200, choices=[(item, item) for item in ENERGY], default="6MV")
    Dose = models.IntegerField(blank=True, validators=[MinValueValidator(0), MaxValueValidator(1000)], default=-1)
    FieldStart = models.IntegerField(blank=True, validators=[MinValueValidator(0), MaxValueValidator(360)], default=-1)
    FieldStop = models.IntegerField(blank=True, validators=[MinValueValidator(0), MaxValueValidator(360)], default=-1)
    ClearCheck = models.FloatField(blank=True, validators=[MinValueValidator(-10.0), MaxValueValidator(10.0)], default=-1.0)
    Complexity = models.FloatField(blank=False, validators=[MinValueValidator(-1.0), MaxValueValidator(1.0)], default=-1.0)
    MU = models.IntegerField(blank=True, validators=[MinValueValidator(0), MaxValueValidator(1000)], default=-1)
    PD_Gamma = models.FloatField(blank=True, validators=[MinValueValidator(0.0), MaxValueValidator(100.0)], default=-1.0)
    BeamOnTime = models.FloatField(blank=True, validators=[MinValueValidator(-1.0), MaxValueValidator(10000.0)], default=-1.0)
    TxSite = models.CharField(blank=True, max_length=200, choices=[(item, item) for item in TX_QA], default=None)
    QAShot = models.CharField(blank=True, max_length=200, choices=[(item, item) for item in TX_QA], default=None)
    Note = models.CharField(blank=True, max_length=200)
    OblFactor = models.CharField(blank=True, max_length=200)

    def __str__(self):
        return str(self.MRN)
